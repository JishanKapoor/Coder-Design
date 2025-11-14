const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "50ms", label: "Average Response Time" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "1B+", label: "API Calls/Month" },
];

export function Stats() {
  return (
    <section className="bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl text-white">
            Trusted by industry leaders worldwide
          </h2>
          <p className="text-lg text-slate-300">
            Our platform powers mission-critical AI applications across industries
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <div className="text-4xl sm:text-5xl text-blue-400">{stat.value}</div>
              <div className="mt-2 text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
