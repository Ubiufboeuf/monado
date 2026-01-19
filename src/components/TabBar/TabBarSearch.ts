import { useSearchStore } from '@/stores/useSearchStore'

export function handleClickSearch () {
  const { isTabBarSearching, setIsTabBarSearching } = useSearchStore.getState()
  setIsTabBarSearching(!isTabBarSearching)
}
