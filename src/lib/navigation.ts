import { NavigateFunction, useNavigate } from 'react-router-dom';

export function navigateAndRefresh(path: string, navigate: NavigateFunction) {
  navigate(path)
  window.location.reload()
}
