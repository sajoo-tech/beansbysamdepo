import { Coffee } from '../types/coffee';

interface PassportCardProps {
  coffee: Coffee;
  roastDate: string;
  lotNo: string;
  certificateNo: string;
  selectedDateISO: string;
}

export default function PassportCard({ coffee, roastDate, lotNo, certificateNo, selectedDateISO }: PassportCardProps) {
  const thinBorder = { borderColor: 'black', borderWidth: 0.5, borderStyle: 'solid' } as React.CSSProperties;
  const isHotBeverage = coffee.isHotBeverage || false;

  const getExpiryDate = () => {
    const productionDate = new Date(selectedDateISO);
    const expiry = new Date(productionDate);
    expiry.setFullYear(expiry.getFullYear() + 1);
    return expiry.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div
      id="printable-area"
      className="w-[10cm] h-[10cm] bg-white text-black overflow-hidden relative mx-auto"
      style={{
        fontSize: '9px',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
        border: '1px solid black',
      }}
    >
      {/* HEADER */}
      <div
        className="flex items-center justify-center gap-3 text-white"
        style={{ height: '2.2cm', backgroundColor: '#000' }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="https://beansbysam.com/wp-content/uploads/2025/10/beyaz-logo.png"
            alt="Beans by Sam Logo"
            className="h-[45px] w-auto mb-1"
          />
          <h1 className="font-serif text-[15px] leading-tight">{isHotBeverage ? 'SICAK KEYİF VE HUZUR SERİSİ' : 'COFFEE PASSPORT'}</h1>
          <p className="text-[10px] tracking-widest">BEANS BY SAM</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-2" style={{ height: '7.0cm' }}>
        <div
          className="grid grid-cols-2 gap-2 h-full"
          style={{ ...thinBorder, borderLeftWidth: 0, borderRightWidth: 0 }}
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between h-full bg-white p-1.5" style={thinBorder}>
            <div>
              <h2 className="text-[1.5rem] font-bold leading-tight uppercase">{coffee.name}</h2>
            </div>

            {isHotBeverage ? (
              <>
                <div className="bg-white p-1 rounded mt-1" style={{ ...thinBorder }}>
                  <div className="space-y-1.5 text-[0.62rem]">
                    <div>
                      <label className="block text-[0.65rem] font-semibold mb-0.5">Tat Profili</label>
                      <p className="leading-tight text-[0.7rem]">{coffee.tasteProfile}</p>
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-semibold mb-0.5">İçindekiler</label>
                      <p className="leading-tight text-[0.65rem]">{coffee.ingredients}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-1 rounded mt-1" style={{ ...thinBorder }}>
                  <div className="grid grid-cols-2 gap-x-3 text-[0.62rem]">
                    <div>
                      <label className="block text-[0.65rem] font-semibold">Rakım</label>
                      <p className="leading-tight">{coffee.altitude}</p>
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-semibold">İşlem</label>
                      <p className="leading-tight">{coffee.process}</p>
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-semibold">Varyete</label>
                      <p className="leading-tight">{coffee.variety}</p>
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-semibold">Asidite</label>
                      <p className="leading-tight">{coffee.acidity}</p>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[0.65rem] font-semibold">Özellikler</label>
                      <p className="leading-tight text-[0.75rem]">{coffee.characteristics}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[0.85rem] mb-1">Tadım Notları</h3>
                  <p className="text-[0.8rem] leading-snug">
                    {coffee.tastingNotes.join(', ')}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-between h-full bg-white p-1.5" style={thinBorder}>
            <div className="space-y-1">
              {isHotBeverage ? (
                <>
                  <div>
                    <label className="block font-semibold text-[0.85rem]">Üretim Tarihi</label>
                    <p className="font-mono text-[0.85rem] leading-tight">{roastDate}</p>
                  </div>

                  <div>
                    <label className="block font-semibold text-[0.85rem]">Son Kullanma Tarihi</label>
                    <p className="font-mono text-[0.85rem] leading-tight">{getExpiryDate()}</p>
                  </div>

                  <div>
                    <label className="block font-semibold text-[0.85rem]">Parti No</label>
                    <p className="font-mono text-[0.85rem] leading-tight">{lotNo}</p>
                  </div>

                  <div>
                    <label className="block font-semibold text-[0.85rem]">Seri No</label>
                    <p className="font-mono text-[0.75rem] leading-tight">{certificateNo}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-semibold text-[0.85rem]">Kavrulma Tarihi</label>
                    <p className="font-mono text-[0.85rem] leading-tight">{roastDate}</p>
                  </div>

                  <div>
                    <label className="block font-semibold text-[0.85rem]">Parti No</label>
                    <p className="font-mono text-[0.85rem] leading-tight">{lotNo}</p>
                  </div>

                  <div>
                    <label className="block font-semibold text-[0.85rem]">Sertifika</label>
                    <p className="font-mono text-[0.75rem] leading-tight">{certificateNo}</p>
                  </div>
                </>
              )}
            </div>

            <div style={{ width: '100%' }}>
              <div style={{ ...thinBorder, paddingTop: 6, paddingBottom: 6 }} className="p-1">
                <h4 className="font-semibold text-[0.85rem] mb-1">Saklama Koşulları</h4>
                <p className="text-[0.75rem] leading-tight">
                  Serin ve kuru ortamda, doğrudan güneş ışığından uzakta muhafaza ediniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-center"
        style={{ height: '0.8cm', backgroundColor: '#fff', ...thinBorder }}
      >
        <div className="flex items-center gap-2 mb-0.5">
          <img
            src="https://beansbysam.com/wp-content/uploads/2025/10/siyah-logo.png"
            alt="Beans by Sam Logo"
            className="h-[14px] w-auto"
          />
          <p className="font-semibold text-[8px]">BEANS BY SAM | KALİTENİN PASAPORTU</p>
        </div>
        <div className="text-[6px] leading-tight text-center text-black">
          <div>Aydın Evler Mah. Selçukbey Cad. No:69/86, Dükkan No: 56 34854 Maltepe / İstanbul</div>
          <div>Tel & WhatsApp: 0544 918 6172 | E-posta: destek@beansbysam.com</div>
        </div>
      </div>
    </div>
  );
}
