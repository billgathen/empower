import { useEffect, useState } from "react"

export default function Loading({ config }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(config.assistantRequest.type !== "")
  }, [config.assistantRequest])

  return <div>
    <svg
      className={`loading ${visible ? 'visible' : ''}`}
      viewBox="0 0 100 100"
      version="1.1"
    >
      <path
        fill="none"
        stroke="white"
        stroke-width="7"
        d="M20,50 A20 20 0 0 1 80,50 A30 30 0 0 1 50,80"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
}
