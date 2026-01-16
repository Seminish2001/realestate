export default function ListingLoading() {
  return (
    <div className="container-shell py-10">
      <div className="space-y-6">
        <div className="skeleton h-10 w-1/2" />
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="skeleton h-64 lg:col-span-2" />
          <div className="grid gap-3">
            <div className="skeleton h-32" />
            <div className="skeleton h-32" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="skeleton h-64" />
          <div className="skeleton h-64" />
        </div>
      </div>
    </div>
  );
}
