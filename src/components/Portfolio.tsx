export default function Portfolio() {
  const items = [1, 2, 3, 4, 5, 6]
  return (
    <section className="my-12">
      <h4 className="text-3xl font-bold text-gray-800 text-center">Portfolio</h4>
      <p className="text-gray-500 text-center mt-2 max-w-2xl mx-auto">
        There are many variations of passages of Lorem Ipsum available, but the majority have
        suffered alteration.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-white shadow-soft">
            <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
              Project {i}
            </div>
            <div className="p-4">
              <h5 className="font-semibold text-gray-800">Project Title {i}</h5>
              <p className="text-gray-500 text-sm mt-2">
                Short description of the project. Clean UI, modern layout.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
