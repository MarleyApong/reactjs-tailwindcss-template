export default function AboutCard() {
  return (
    <section className="my-12 absolute">
      <div className="card p-8 rounded-2xl shadow-soft">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-44 h-44 bg-white rounded-lg overflow-hidden shadow-soft">
              <img
                src="/src/assets/profile.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-2xl font-bold text-gray-800">
              I am Professional User Experience Designer
            </h3>
            <p className="mt-4 text-gray-500 max-w-2xl">
              I design and develop services for customers specializing creating stylish, modern
              websites, web services and online stores. My passion is to design digital user
              experiences.
            </p>

            <div className="mt-6 flex gap-4">
              <button className="bg-primary text-white px-4 py-2 rounded-lg">My Project</button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
