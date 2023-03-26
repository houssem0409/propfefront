import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import StarRating from '../../../components/StarRating'
export default function Review() {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout>
      <div style={{ marginTop: '80px' }}>
        <StarRating props={id} />
      </div>
    </Layout>
  )
}
