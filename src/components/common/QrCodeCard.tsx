import React from 'react';

interface QrCodeProps {
  payload: string;
  size?: number;
  label?: string;
  onScanClick?: () => void;
}

export const QrCodeCard: React.FC<QrCodeProps> = ({
  payload,
  size = 140,
  label = 'MoE-APAAR SECURE QR',
  onScanClick
}) => {
  // Deterministic 21x21 QR code matrix simulation based on payload
  const matrixSize = 21;
  const hash = payload.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const isDark = (row: number, col: number) => {
    // 3 Corner finder patterns (7x7)
    if (
      (row < 7 && col < 7) ||
      (row < 7 && col >= matrixSize - 7) ||
      (row >= matrixSize - 7 && col < 7)
    ) {
      if (
        (row === 0 || row === 6 || col === 0 || col === 6) &&
        !(row >= 7 || col >= 7)
      ) return true;
      if (
        (row >= 2 && row <= 4 && col >= 2 && col <= 4)
      ) return true;
      // Right top
      if (
        (row === 0 || row === 6 || col === matrixSize - 7 || col === matrixSize - 1) &&
        row < 7 && col >= matrixSize - 7
      ) return true;
      if (
        row >= 2 && row <= 4 && col >= matrixSize - 5 && col <= matrixSize - 3
      ) return true;
      // Left bottom
      if (
        (row === matrixSize - 7 || row === matrixSize - 1 || col === 0 || col === 6) &&
        row >= matrixSize - 7 && col < 7
      ) return true;
      if (
        row >= matrixSize - 5 && row <= matrixSize - 3 && col >= 2 && col <= 4
      ) return true;

      return false;
    }

    // Center emblem exclusion zone (5x5)
    if (row >= 8 && row <= 12 && col >= 8 && col <= 12) {
      return false;
    }

    // Timing patterns
    if (row === 6 || col === 6) {
      return (row + col) % 2 === 0;
    }

    // Pseudo-random data bits based on char code & coordinates
    const pseudo = (row * 37 + col * 43 + hash) % 7;
    return pseudo === 0 || pseudo === 2 || pseudo === 4;
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        onClick={onScanClick}
        title={onScanClick ? "Click to simulate instant camera scan" : "Tamper-evident cryptographic QR"}
        className={`bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm relative group ${onScanClick ? 'cursor-pointer hover:border-amber-500 hover:ring-2 hover:ring-amber-500/20 transition-all' : ''}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox={`0 0 ${matrixSize} ${matrixSize}`}
          className="w-full h-full text-slate-900"
          shapeRendering="crispEdges"
        >
          {Array.from({ length: matrixSize }).map((_, r) =>
            Array.from({ length: matrixSize }).map((_, c) => {
              if (isDark(r, c)) {
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c}
                    y={r}
                    width={1}
                    height={1}
                    fill="currentColor"
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {/* Center Gov Emblem Seal Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-6 bg-white rounded-full p-0.5 shadow-sm border border-slate-200 flex items-center justify-center">
            <span className="text-[9px] font-black text-amber-600 tracking-tighter">
              सत्य
            </span>
          </div>
        </div>

        {onScanClick && (
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity text-white text-[10px] font-medium text-center p-1">
            Tap to Verify
          </div>
        )}
      </div>

      {label && (
        <span className="mt-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-600 dark:text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
};
