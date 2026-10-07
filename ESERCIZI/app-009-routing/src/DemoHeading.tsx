import type { ReactNode } from 'react'

export default function DemoHeading({ eyebrow, title, children }: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="demo-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  )
}