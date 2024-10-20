import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/dashboard/posts"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Posts
      </Link>
      <Link
        href="/dashboard/pages"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Pages
      </Link>
      <Link
        href="/dashboard/videos"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Videos
      </Link>
      <Link
        href="/dashboard/channels"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Channels
      </Link>
      <Link
        href="/dashboard/clients"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Clients
      </Link>
      <Link
        href="/dashboard/docs"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Docs
      </Link>
      <Link
        href="/dashboard/gallery"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Gallery
      </Link>
    </nav>
  )
}