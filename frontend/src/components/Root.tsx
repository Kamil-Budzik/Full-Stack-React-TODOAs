import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Todos from './Todos.tsx'

const queryClient = new QueryClient()

function Root() {

  return (
    <QueryClientProvider client={queryClient}>
        <Todos />
    </QueryClientProvider>
  )
}

export default Root;