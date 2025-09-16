import React,{useState} from 'react'
import KolamSketch from './KolamSketch'
import HomeCard from "../components/HomeCard"
const Home = () => {
   const [activePoint, setActivePoint] = useState(null);

  const culturalPoints = [
    "Preserves traditional Kolam art digitally.",
    "Acts as an educational tool for geometry, symmetry, and algorithms.",
    "Promotes cultural heritage among younger generations.",
    "Encourages creative expression by blending art with technology.",
  ];
  return (
    <div>
      <div className=''>
        <HomeCard/>
        <KolamSketch />
           <div>
        <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4">
          Cultural & Educational Value
        </h2>
        <ul className="space-y-3">
          {culturalPoints.map((point, idx) => (
            <li
              key={idx}
              onClick={() =>
                setActivePoint(activePoint === idx ? null : idx)
              }
              className={`cursor-pointer p-3 rounded-xl border transition ${
                activePoint === idx
                  ? "bg-indigo-900/40 border-indigo-400 shadow-md"
                  : "bg-[var(--secondary-color)] border-gray-700 hover:bg-gray-800"
              }`}
            >
              <span className="font-medium text-[var(--text-color)]">{point}</span>
              {activePoint === idx && (
                <p className="text-sm mt-2 text-[var(--subtle-text-color)]">
                  More insight: This aspect highlights how Kolam can inspire
                  digital creativity while keeping cultural roots alive.
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default Home;
