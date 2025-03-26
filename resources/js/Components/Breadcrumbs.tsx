import { Link } from '@inertiajs/react'

interface BreadcrumbItem {
  title: string
  url?: string
  active?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <ol className="breadcrumb breadcrumb-arrows" aria-label="breadcrumbs">
      {items.map((item, index) => (
        <li 
          key={index} 
          className={`breadcrumb-item ${item.active ? 'active' : ''}`}
          aria-current={item.active ? 'page' : undefined}
        >
          {item.url && !item.active ? (
            <Link href={item.url}>{item.title}</Link>
          ) : (
            item.title
          )}
        </li>
      ))}
    </ol>
  )
} 