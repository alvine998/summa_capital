import { useState, useEffect } from "react";
import { Eye, Edit2, Trash2, X, Image, Upload } from "lucide-react";
import { galleryService } from "../../../services/galleryService";
import { useToast } from "../../../components/Toast/Toast";
import "./galeri.css";

export default function Gallery() {
  const { toasts, addToast, removeToast, Toast } = useToast();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGalleryForView, setSelectedGalleryForView] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [deletingGallery, setDeletingGallery] = useState(null);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Office",
    images: [],
  });

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const result = await galleryService.listAdmin();
      const galleriesData = Array.isArray(result) ? result : result?.data || [];
      setGalleries(galleriesData);
    } catch (err) {
      console.error("Failed to load galleries:", err);
      addToast("Failed to load galleries", "error");
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const categories = ["All", ...new Set(galleries.map((g) => g.category))];

  const filteredGalleries =
    activeCategory === "All"
      ? galleries
      : galleries.filter((g) => g.category === activeCategory);

  const handleOpenCreate = () => {
    setFormData({ title: "", category: "Office", images: [] });
    setFormError("");
    setShowCreateModal(true);
  };

  const handleOpenEdit = (gallery) => {
    setEditingGallery(gallery);
    setFormData({
      title: gallery.title,
      category: gallery.category,
      images: (gallery.images || []).map((img, idx) => ({
        id: idx,
        preview: img,
      })),
    });
    setFormError("");
    setShowEditModal(true);
  };

  const handleOpenDelete = (gallery) => {
    setDeletingGallery(gallery);
    setShowDeleteModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const currentImages = formData.images;
    const maxImages = 10;
    const maxTotalSize = 25 * 1024 * 1024; // 25 MB
    let totalSize = 0;

    if (currentImages.length + files.length > maxImages) {
      setFormError(`Maximum ${maxImages} images allowed per gallery`);
      return;
    }

    const newImages = [];
    for (const file of files) {
      totalSize += file.size;
      if (totalSize > maxTotalSize) {
        setFormError("Total gallery size cannot exceed 25 MB");
        return;
      }
      newImages.push({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        size: (file.size / 1024 / 1024).toFixed(2),
        name: file.name,
      });
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
    setFormError("");
    e.target.value = "";
  };

  const removeImage = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  const handleCreateGallery = async () => {
    if (!formData.title.trim()) {
      setFormError("Gallery title is required");
      return;
    }
    const newFiles = formData.images.filter((img) => img.file);
    if (newFiles.length === 0) {
      setFormError("Please upload at least 1 image");
      return;
    }
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      newFiles.forEach((img) => fd.append("images", img.file));
      const created = await galleryService.create(fd);
      setGalleries((prev) => [...prev, created]);
      setShowCreateModal(false);
      setFormData({ title: "", category: "Office", images: [] });
      addToast("Gallery created successfully!", "success");
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to create gallery");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateGallery = async () => {
    if (!formData.title.trim()) {
      setFormError("Gallery title is required");
      return;
    }
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      formData.images
        .filter((img) => img.file)
        .forEach((img) => fd.append("images", img.file));
      const updated = await galleryService.update(editingGallery.id, fd);
      setGalleries((prev) =>
        prev.map((g) =>
          g.id === editingGallery.id ? { ...g, ...updated } : g,
        ),
      );
      setShowEditModal(false);
      setEditingGallery(null);
      setFormData({ title: "", category: "Office", images: [] });
      addToast("Gallery updated successfully!", "success");
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to update gallery");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGallery = async () => {
    try {
      await galleryService.delete(deletingGallery.id);
      setGalleries((prev) => prev.filter((g) => g.id !== deletingGallery.id));
      addToast("Gallery deleted successfully!", "success");
    } catch (err) {
      addToast(
        err.response?.data?.message || "Failed to delete gallery",
        "error",
      );
    } finally {
      setShowDeleteModal(false);
      setDeletingGallery(null);
    }
  };

  return (
    <div className="office-page">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="office-header">
        <div className="office-header-content">
          <h1 className="office-header-title">
            <Image className="inline-icon" size={28} /> Gallery
          </h1>
          <button className="create-btn" onClick={handleOpenCreate}>
            + Create Gallery
          </button>
        </div>
      </div>

      <div className="office-content">
        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading galleries...</div>
        ) : (
          <>
            <div className="gallery-grid">
              {filteredGalleries.map((gallery) => (
                <div key={gallery.id} className="gallery-item">
                  <div className="gallery-image-wrapper">
                    <img src={(gallery.images || [])[0]} alt={gallery.title} />
                    <div className="image-count">
                      {(gallery.images || []).length}/10
                    </div>
                    <div className="gallery-overlay">
                      <button
                        className="gallery-btn view-btn"
                        onClick={() => setSelectedGalleryForView(gallery)}
                      >
                        <Eye size={18} /> View
                      </button>
                      <button
                        className="gallery-btn edit-btn"
                        onClick={() => handleOpenEdit(gallery)}
                      >
                        <Edit2 size={18} /> Edit
                      </button>
                      <button
                        className="gallery-btn delete-btn"
                        onClick={() => handleOpenDelete(gallery)}
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                  <div className="gallery-info">
                    <h3 className="gallery-title">{gallery.title}</h3>
                    <div className="gallery-meta">
                      <span className="gallery-category">
                        {gallery.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredGalleries.length === 0 && (
              <div className="empty-state">
                <Image size={48} />
                <p>No galleries found</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* View Gallery Modal */}
      {selectedGalleryForView && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedGalleryForView(null)}
        >
          <div
            className="modal-gallery-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedGalleryForView(null)}
            >
              ×
            </button>
            <div className="modal-gallery-header">
              <h2>{selectedGalleryForView.title}</h2>
              <span className="modal-gallery-category">
                {selectedGalleryForView.category}
              </span>
            </div>
            <div className="modal-gallery-images">
              {selectedGalleryForView.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${selectedGalleryForView.title} ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Gallery Modal */}
      {(showCreateModal || showEditModal) && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            setEditingGallery(null);
          }}
        >
          <div
            className="form-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="form-modal-header">
              <h2>{editingGallery ? "Edit Gallery" : "Create Gallery"}</h2>
              <button
                className="modal-close"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setEditingGallery(null);
                }}
              >
                ×
              </button>
            </div>

            <div className="form-modal-body">
              {formError && <div className="form-error">{formError}</div>}

              <div className="form-group">
                <label className="form-label">Gallery Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Office Renovation 2024"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-input"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Office">Office</option>
                  <option value="Interior">Interior</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Landscape">Landscape</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Upload Images * ({formData.images.length}/10)
                </label>
                <div className="upload-area">
                  <input
                    type="file"
                    id="gallery-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={formData.images.length >= 10}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="gallery-upload"
                    className="upload-label"
                    style={{ opacity: formData.images.length >= 10 ? 0.5 : 1 }}
                  >
                    <Upload size={24} />
                    <span>Click to upload or drag images</span>
                    <span className="upload-hint">
                      Max 10 images, 25 MB total
                    </span>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="images-preview-grid">
                    {formData.images.map((img, idx) => (
                      <div key={img.id} className="preview-item">
                        <img src={img.preview} alt={`Preview ${idx + 1}`} />
                        <div className="preview-info">
                          <span className="preview-number">{idx + 1}</span>
                          {img.size && (
                            <span className="preview-size">{img.size}MB</span>
                          )}
                        </div>
                        <button
                          type="button"
                          className="preview-remove"
                          onClick={() => removeImage(img.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-modal-actions">
              <button
                className="form-btn cancel"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setEditingGallery(null);
                }}
              >
                Cancel
              </button>
              <button
                className="form-btn submit"
                onClick={
                  editingGallery ? handleUpdateGallery : handleCreateGallery
                }
                disabled={submitting}
              >
                {submitting
                  ? "Saving..."
                  : editingGallery
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="confirm-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Delete Gallery</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deletingGallery?.title}</strong>?
            </p>
            <p className="delete-warning">This action cannot be undone.</p>
            <div className="confirm-modal-actions">
              <button
                className="confirm-btn cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-btn delete"
                onClick={handleDeleteGallery}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
