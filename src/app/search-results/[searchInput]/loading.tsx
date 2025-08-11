export default function Loading() {
  return (
    <main className="mx-auto mt-24 w-10/12 max-w-3xl py-10">
      <div className="mb-6 text-lg font-semibold text-gray-600">
        Loading search results...
      </div>
      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <li key={idx} className="h-12 animate-pulse rounded-md bg-gray-200" />
        ))}
      </ul>

      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    </main>
  );
}
