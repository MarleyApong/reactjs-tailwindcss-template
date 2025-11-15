export default function Hero() {
  return (
    <section className="relative mt-8 mb-12">
      <div className="p-8 shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Hello, I’m <br /> Marley Apong
            </h1>
            <p className="mt-4 text-gray-500 max-w-xl">
              I'm a Freelance UI/UX Designer and Developer based in London, England. I strive to
              build immersive and beautiful web applications through carefully crafted code and
              user-centric design.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <button className="bg-primary text-white px-4 py-2 rounded-lg shadow">
                Say Hello
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white/90 rounded-lg p-4 text-center shadow-soft">
                <div className="text-xl font-bold">15 Y.</div>
                <div className="text-xs text-gray-500">Experience</div>
              </div>
              <div className="bg-white/90 rounded-lg p-4 text-center shadow-soft">
                <div className="text-xl font-bold">250+</div>
                <div className="text-xs text-gray-500">Project Completed</div>
              </div>
              <div className="bg-white/90 rounded-lg p-4 text-center shadow-soft">
                <div className="text-xl font-bold">58</div>
                <div className="text-xs text-gray-500">Happy Client</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-end">
            <div className="w-72 md:w-80 lg:w-96 bg-white rounded-2xl overflow-hidden shadow-soft transform translate-y-2">
              <img
                src="/src/assets/profile.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
