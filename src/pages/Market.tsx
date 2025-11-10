import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { medicines } from '../data/medicines'

export default function Market() {
  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Market</h1>
      <p className="text-muted-foreground mb-8">
        Browse available medicines and supplements
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <Link key={medicine.id} to="/medicines">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle>{medicine.name}</CardTitle>
                <CardDescription>{medicine.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {medicine.description}
                </p>
                <p className="text-sm font-medium mt-4 text-primary-600">
                  View Details →
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

