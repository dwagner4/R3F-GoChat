export default function Arena()
{
  return <mesh receiveShadow position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 1 }>
    <planeGeometry />
    <meshStandardMaterial color="greenyellow" />
  </mesh>
}