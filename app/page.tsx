// app/page.tsx
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Our Social Site</h1>
      <p className="text-lg mb-8">
        Connect with friends and the world around you. Join us today!
      </p>
      <a
        href="/about"
        className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Learn More
      </a>
    </div>
  );
}


