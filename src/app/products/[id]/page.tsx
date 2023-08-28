export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>THIS IS THE PRODUCT PAGE</h1>
      <p>Product id: {params.id}</p>
    </main>
  )
}
