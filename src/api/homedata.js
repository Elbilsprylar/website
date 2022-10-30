export const getHomeData = async () => {
  const res = await fetch(
    `${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/rae/v1/home`,
    { method: "GET" }
  )
  const data = await res.json()

  return data
}

export const getHeaderCategories = async () => {
  const res = await fetch(
    ` ${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header`,
    { method: "GET" }
  )
  const data = await res.json()

  return data.data.header
}

export const getFooterLinks = async () => {
  const res = await fetch(
    ` ${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/rae/v1/header-footer?footer_location_id=hcms-menu-footer`,
    { method: "GET" }
  )
  const data = await res.json()

  return data.data.footer
}

export const getPageData = async (pageId) => {
  console.log(
    `${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/wp/v2/pages/${pageId}`
  )
  const res = await fetch(
    `${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/wp/v2/pages/${pageId}`,
    { method: "GET" }
  )
  const data = await res.json()

  return data
}

export const getPosts = async () => {
  const res = await fetch(
    ` ${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/wp/v2/posts`,
    { method: "GET" }
  )
  const data = await res.json()

  return data
}
