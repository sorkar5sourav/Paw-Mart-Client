const SkeletonCard = () => {
  return (
    <div
      className="animate-pulse card bg-base-100 shadow-sm"
      style={{ borderRadius: "var(--radius-md)", minHeight: 380 }}
    >
      <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-t-md" />
      <div className="p-4">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
