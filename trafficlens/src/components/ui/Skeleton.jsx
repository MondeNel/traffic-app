const Skeleton = ({ className = '', style = {} }) => (
  <div
    className={`animate-pulse bg-slate-200 rounded ${className}`}
    style={style}
  />
);

export const StatCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-lg p-2 md:p-3 space-y-1.5 relative" style={{ borderLeftWidth: 3, borderLeftColor: '#E2E8F0' }}>
    <Skeleton className="h-7 w-7 rounded-md absolute right-2 top-2 md:right-2.5 md:top-2.5" />
    <Skeleton className="h-2 w-16 md:w-20" />
    <Skeleton className="h-4 w-14 md:w-20" />
    <Skeleton className="h-1.5 w-24 md:w-28" />
  </div>
);

export const FineRowSkeleton = () => (
  <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-200">
    <Skeleton className="w-[30px] h-[30px] rounded-md shrink-0" />
    <div className="flex-1 space-y-1.5 min-w-0">
      <Skeleton className="h-3 w-48" />
      <Skeleton className="h-2 w-64" />
    </div>
    <Skeleton className="h-4 w-14 shrink-0" />
    <Skeleton className="h-7 w-16 rounded-md shrink-0" />
  </div>
);

export const LicenseCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 space-y-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="w-7 h-5 rounded-sm" />
        <div className="space-y-1">
          <Skeleton className="h-2 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <Skeleton className="h-3 w-12" />
    </div>
    <div className="flex gap-4">
      <Skeleton className="w-[76px] h-[94px] rounded-lg shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px 16px' }}>
          {Array(6).fill(null).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-1.5 w-14" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex items-end justify-between pt-3 border-t border-slate-200">
      <div className="flex gap-2">
        {Array(7).fill(null).map((_, i) => <Skeleton key={i} className="h-5 w-8 rounded-md" />)}
      </div>
      <Skeleton className="w-16 h-16 rounded-lg" />
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
    <div className="flex items-center gap-3">
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <Skeleton className="h-4 w-32" />
    </div>
    <Skeleton className="h-3 w-full" />
    <div className="flex gap-4">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-20" />
    </div>
  </div>
);

export const TableRowSkeleton = ({ cols = 4 }) => (
  <div className="flex items-center gap-4 px-4 py-3 border-b border-slate-200">
    <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
    {Array(cols - 1).fill(null).map((_, i) => (
      <Skeleton key={i} className={`h-3 ${i === 0 ? 'flex-1' : 'w-20'}`} />
    ))}
  </div>
);

export default Skeleton;