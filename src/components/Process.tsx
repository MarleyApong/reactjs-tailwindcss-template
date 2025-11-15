import React from "react"

function ProcessCard({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="bg-white/90 rounded-xl p-6 shadow-soft">
      <div className="text-sm text-purple-600 font-semibold mb-2">{num}</div>
      <div className="font-semibold text-gray-800 mb-2">{title}</div>
      <p className="text-gray-500 text-sm">{children}</p>
    </div>
  )
}

export default function Process() {
  return (
    <section className="my-12 grid md:grid-cols-12 gap-8 items-start">
      <div className="md:col-span-6">
        <h4 className="text-3xl font-bold text-gray-800">Work Process</h4>
        <p className="mt-4 text-gray-500 max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam.
        </p>
        <p className="mt-4 text-gray-500 max-w-md">
          Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.
        </p>
      </div>

      <div className="md:col-span-6 grid grid-cols-2 gap-4">
        <ProcessCard num="1. Research" title="Research">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ProcessCard>
        <ProcessCard num="2. Analyze" title="Analyze">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ProcessCard>
        <ProcessCard num="3. Design" title="Design">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ProcessCard>
        <ProcessCard num="4. Launch" title="Launch">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ProcessCard>
      </div>
    </section>
  )
}
