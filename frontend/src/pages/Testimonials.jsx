const testimonials = [
  {
    name: 'Amit Sharma',
    review: 'Amazing service and subsidy support.',
  },
  {
    name: 'Rohit Gupta',
    review: 'Professional installation team.',
  },
]

export default function Testimonials() {
  return (
    <div className='max-w-7xl mx-auto pt-32 px-6'>
      <h1 className='text-5xl font-bold text-center text-green-400'>Testimonials</h1>

      <div className='grid md:grid-cols-2 gap-8 mt-20'>
        {testimonials.map((item, index) => (
          <div key={index} className='glass p-8 rounded-3xl'>
            <h2 className='text-2xl font-bold'>{item.name}</h2>
            <p className='mt-4'>{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}