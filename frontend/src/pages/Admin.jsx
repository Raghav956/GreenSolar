import toast from "react-hot-toast";
export default function Admin() {
  return (
    <div className='max-w-7xl mx-auto pt-32 px-6'>
      <h1 className='text-5xl font-bold text-green-400'>Admin Dashboard</h1>

      <div className='grid md:grid-cols-3 gap-6 mt-10'>
        <div className='glass p-8 rounded-3xl'>
          <h2 className='text-2xl'>Upload Testimonials</h2>
        </div>

        <div className='glass p-8 rounded-3xl'>
          <h2 className='text-2xl'>Upload Projects</h2>
        </div>

        <div className='glass p-8 rounded-3xl'>
          <h2 className='text-2xl'>Analytics</h2>
        </div>
      </div>
    </div>
  )
}