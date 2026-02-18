export default function TrustBadges() {
  const stats = [
    { value: "50+", label: "Websites Delivered" },
    { value: "4.9★", label: "Average Rating" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "<24h", label: "Response Time" },
  ];

  return (
    <div className="bg-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
