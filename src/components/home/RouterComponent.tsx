"use client"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export default function RouterComponent({
  section,
  id,
}: {
  section: string
  id?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { ref, inView } = useInView({ threshold: 1 })

  useEffect(() => {
    if (inView) {
      router.push(section, { scroll: false })
    }
  }, [inView, router, section, pathname])

  return (
    <div
      style={{
        position: "absolute",
        height: "50vh",
        width: "1px",
        marginTop: "-100px",
      }}
      ref={ref}
      id={id}
    ></div>
  )
}
