import Sidebar from "../components/Sidebar";
import { useThemesStore } from "../store/useThemesStore";
import { THEMES } from "../constants/index.js";

const SettingsPage = () => {
  const { theme, setTheme } = useThemesStore();
  const listThemes = THEMES;
  console.log(listThemes);

  return (
    <div className="h-screen flex items-center">
      <Sidebar />
      <div className="w-full flex items-center justify-center p-2 md:p-6">
        <div className="p-5 h-full w-full max-w-4xl border shadow-md rounded-lg overflow-auto animate-scaleUp">
          <h1 className="font-semibold text-xl">Themes</h1>
          <p className="mb-5">Choose a theme for your chat interface</p>
          <div className="flex gap-4 justify-center items-center flex-wrap h-full max-h-96 overflow-auto">
            {listThemes.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors 
                   ${
                     theme === t ? "bg-neutral-500" : "hover:bg-neutral-500/50"
                   }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-8 min-w-40 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
