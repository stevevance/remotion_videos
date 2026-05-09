import { Composition } from 'remotion';
import { AduClip } from './AduClip';
import { PeopleOverParking } from './PeopleOverParking';
import { BuildPlanTestimony } from './BuildPlanTestimony';
import { WalkSlideshow } from './WalkSlideshow';

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
        durationInFrames={540}
        fps={30}
        width={1080}
        height={720}
      />
      <Composition
        id="BuildPlanTestimony"
        component={BuildPlanTestimony}
        durationInFrames={510}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="WalkSlideshow"
        component={WalkSlideshow}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={720}
      />
    </>
  );
}
