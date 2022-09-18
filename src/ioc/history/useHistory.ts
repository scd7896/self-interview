import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function useHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const push = useCallback(
    (pathname: string, options?: any) => {
      navigate(pathname, options);
    },
    [navigate],
  );

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  return {
    push,
    getParam,
  };
}
