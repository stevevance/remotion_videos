import { Composition } from 'remotion';
import { AduClip } from './AduClip';
import { PeopleOverParking } from './PeopleOverParking';

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="AduClip"
        component={AduClip}
        durationInFrames={1419}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PeopleOverParking"
        component={PeopleOverParking}
        durationInFrames={540}  // 18 seconds at 30fps
        fps={30}
        width={1080}
        height={720}
      />
    </>
  );
}
