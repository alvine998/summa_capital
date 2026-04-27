import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const TOOLBAR = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'image'],
  ['clean'],
]

export default function QuillEditor({
  defaultValue = '',
  onChange,
  placeholder = 'Write your content here...',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const editorDiv = document.createElement('div')
    container.appendChild(editorDiv)

    const quill = new Quill(editorDiv, {
      theme: 'snow',
      placeholder,
      modules: { toolbar: TOOLBAR },
    })

    if (defaultValue) {
      quill.clipboard.dangerouslyPasteHTML(defaultValue)
    }

    quill.on('text-change', () => {
      onChange?.(quill.root.innerHTML)
    })

    return () => {
      container.innerHTML = ''
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} />
}
