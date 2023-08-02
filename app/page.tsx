import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants'
import { fetchCars } from '@/utils'

export default async function Home({ searchParams }: any) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  })
  const isDataEmpty =
    allCars.length === 0 || !Array.isArray(allCars) || !allCars
  return (
    <main className="overflow-hidden ">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width " id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold ">Car Rental</h1>
          <p>Explore the cars that we have available for you.</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home_filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.pageNumber || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container ">
            <h1 className="text-xl font-bold text-black">
              There are no cars available
            </h1>
          </div>
        )}
      </div>
    </main>
  )
}
