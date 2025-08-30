export default function HeroSection() {
  return (
    <section className="mx-auto mt-20 max-w-5xl px-4">
      <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
        Funktioner som förenklar jakten
      </h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Jaktkort
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Håll koll på medlemmarnas jaktkort och se till att allt är i ordning
            innan jakten börjar.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Jakt & vilt
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Skapa jakter, tilldela roller och rapportera fällt vilt direkt i
            appen.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Kommunikation
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Håll kontakt med laget via inbyggd chatt och notifieringar.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dokument
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Samla avtal, regler och protokoll på en plats som alla i laget
            kommer åt.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Kartor
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Hantera jaktområden, pass och gränser med digital kartfunktion.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Roller & medlemskap
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Bjud in nya medlemmar och ge dem roller som admin, moderator eller
            medlem.
          </p>
        </div>
      </div>
    </section>
  );
}
