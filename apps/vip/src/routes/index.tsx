import { createFileRoute } from '@tanstack/react-router';
import fengmian from '@assets/fengmian.jpg';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  // return <div>Hello "/"!</div>
  // return <Navigate to="/769/courseware" />;
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={fengmian}
          style={{
            marginTop: '20px',
            objectFit: 'contain',
            maxWidth: '1080px',
            height: '85vh',
          }}
        />
      </div>
    </>
  );
}
