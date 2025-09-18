export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full min-h-screen flex flex-col bg-gray-100 items-center justify-center'>
      {children}
    </div>
  )
}
