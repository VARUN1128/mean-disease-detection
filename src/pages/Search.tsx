import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { Link } from 'react-router-dom'
import { fishDiseases } from '../data/fishDiseases'
import { shrimpDiseases } from '../data/shrimpDiseases'
import { medicines } from '../data/medicines'

export default function Search() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'diseases' | 'medicines'>('all')

  const allDiseases = [...fishDiseases, ...shrimpDiseases]
  const filteredDiseases = query
    ? allDiseases.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.description.toLowerCase().includes(query.toLowerCase())
      )
    : []
  const filteredMedicines = query
    ? medicines.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.description.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const showDiseases = activeTab === 'all' || activeTab === 'diseases'
  const showMedicines = activeTab === 'all' || activeTab === 'medicines'

  return (
    <div className="container mx-auto px-4 py-4 pb-24 md:pb-8 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Search Input - Prominent at top */}
        <div className="relative mb-6 mt-4">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search diseases, medicines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('diseases')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'diseases'
                ? 'bg-primary-500 text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            Diseases
          </button>
          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'medicines'
                ? 'bg-primary-500 text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            Medicines
          </button>
        </div>

        {/* Results */}
        {!query && (
          <div className="text-center py-12 text-muted-foreground">
            <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Start typing to search...</p>
          </div>
        )}

        {query && (
          <div className="space-y-6">
            {showDiseases && filteredDiseases.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Diseases</h2>
                <div className="space-y-3">
                  {filteredDiseases.map((disease) => (
                    <Link key={disease.id} to="/manual">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1">{disease.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {disease.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {showMedicines && filteredMedicines.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Medicines</h2>
                <div className="space-y-3">
                  {filteredMedicines.map((medicine) => (
                    <Link key={medicine.id} to="/medicines">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1">{medicine.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {medicine.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {query &&
              ((showDiseases && filteredDiseases.length === 0) ||
                (showMedicines && filteredMedicines.length === 0)) && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No results found</p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  )
}

