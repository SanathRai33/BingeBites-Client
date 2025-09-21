const MainLayout = () => {
  const { pathname } = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);

  const hideOn = [
    '/user/login',
    '/user/register',
    '/food-partner/login',
    '/food-partner/register'
  ];

  const hide = hideOn.includes(pathname);

  if (isLoading && !hide) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Outlet />
      {!hide && <BottomNav user={user} />}
    </>
  );
};