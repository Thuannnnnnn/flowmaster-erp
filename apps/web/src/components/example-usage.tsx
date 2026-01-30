'use client';

import { useAppColor } from '@/hooks';

export default function ExampleUsage() {
  const appColors = useAppColor();

  return (
    <div style={{ backgroundColor: appColors.white, padding: '20px' }}>
      <h1 style={{ color: appColors.primary.DEFAULT }}>Example Component</h1>
      <button style={{ backgroundColor: appColors.brand.DEFAULT, color: appColors.white }}>
        Click me
      </button>
      <div style={{ backgroundColor: appColors.success, padding: '10px', marginTop: '10px' }}>
        Success message
      </div>
    </div>
  );
}
