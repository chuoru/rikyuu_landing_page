'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const MESH_MANIFEST: [string, string][] = [
  ['/starrobox/assets/robots/fairino5_v6/base_link.STL',    '/working/assets/base_link.STL'],
  ['/starrobox/assets/robots/fairino5_v6/shoulder_link.STL', '/working/assets/robots/fairino5_v6/shoulder_link.STL'],
  ['/starrobox/assets/robots/fairino5_v6/upperarm_link.STL', '/working/assets/robots/fairino5_v6/upperarm_link.STL'],
  ['/starrobox/assets/robots/fairino5_v6/forearm_link.STL',  '/working/assets/robots/fairino5_v6/forearm_link.STL'],
  ['/starrobox/assets/robots/fairino5_v6/wrist1_link.STL',   '/working/assets/robots/fairino5_v6/wrist1_link.STL'],
  ['/starrobox/assets/robots/fairino5_v6/wrist2_link.STL',   '/working/assets/robots/fairino5_v6/wrist2_link.STL'],
  ['/starrobox/assets/robots/fairino5_v6/wrist3_link.STL',   '/working/assets/robots/fairino5_v6/wrist3_link.STL'],
  ['/starrobox/assets/gripper/iai/upper_body.stl',    '/working/assets/gripper/iai/upper_body.stl'],
  ['/starrobox/assets/gripper/iai/lower_body.stl',    '/working/assets/gripper/iai/lower_body.stl'],
  ['/starrobox/assets/gripper/iai/left_pinch.stl',    '/working/assets/gripper/iai/left_pinch.stl'],
  ['/starrobox/assets/gripper/iai/right_pinch.stl',   '/working/assets/gripper/iai/right_pinch.stl'],
  ['/starrobox/assets/gripper/iai/cable.stl',         '/working/assets/gripper/iai/cable.stl'],
  ['/starrobox/assets/gripper/iai/gripper_side.stl',  '/working/assets/gripper/iai/gripper_side.stl'],
  ['/starrobox/assets/gripper/iai/claw.stl',          '/working/assets/gripper/iai/claw.stl'],
  ['/starrobox/assets/gripper/iai/gripper_cover.stl', '/working/assets/gripper/iai/gripper_cover.stl'],
  ['/starrobox/assets/gripper/iai/connect_part.stl',  '/working/assets/gripper/iai/connect_part.stl'],
  ['/starrobox/assets/box/starrobot_box.stl',         '/working/assets/box/starrobot_box.stl'],
];

const SCENES = [
  { id: 'starrobox_cafe', label: 'ワインボックス', xml: '/starrobox/starrobox_cafe_web.xml' },
];

// Initial joint positions (radians). Press P in the viewer to log live qpos.
// Ordering assumes right arm at qpos[0..5], left arm at qpos[6..11].
// Swap the two rows if the arms appear mirrored.
const DEG = Math.PI / 180;
const INITIAL_QPOS: number[] | null = [
  // left arm:  174.5, -113.7, -76.1, -27.8, 80.5, 2.0  (deg)
  174.5 * DEG, -113.7 * DEG, -76.1 * DEG,  -27.8 * DEG,  80.5 * DEG,  2.0 * DEG, 0.0, 0.0,
  // right arm: 19.2, -71.9, 75.8, -176.2, -73.6, 0.0  (deg)
   19.2 * DEG, -71.9 * DEG,  75.8 * DEG, -176.2 * DEG, -73.6 * DEG,  0.0 * DEG, 0.0, 0.0
];

type Status = 'idle' | 'loading-wasm' | 'loading-assets' | 'ready' | 'error';

interface JointMeta {
  name: string;
  qposadr: number;
  min: number;
  max: number;
  isHinge: boolean;
}

interface SimViewerProps {
  className?: string;
}

export default function SimViewer({ className }: SimViewerProps) {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const containerRef   = useRef<HTMLDivElement>(null);
  const [status, setStatus]           = useState<Status>('idle');
  const [sceneId, setSceneId]         = useState(SCENES[0].id);
  const [jointMeta, setJointMeta]     = useState<JointMeta[]>([]);
  const [jointValues, setJointValues] = useState<number[]>([]);
  const initialized    = useRef(false);
  const cleanupRef     = useRef<(() => void) | null>(null);
  const applyJointRef  = useRef<((qposadr: number, val: number) => void) | null>(null);
  const resetJointsRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !initialized.current) {
          initialized.current = true;
          initSim().then(fn => { if (fn) cleanupRef.current = fn; });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
      cleanupRef.current?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJointChange = useCallback((index: number, qposadr: number, val: number) => {
    setJointValues(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
    applyJointRef.current?.(qposadr, val);
  }, []);

  const handleReset = useCallback(() => {
    resetJointsRef.current?.();
  }, []);

  async function initSim(): Promise<(() => void) | null> {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    try {
      setStatus('loading-wasm');

      // webpackIgnore prevents Next.js from trying to bundle the 11 MB WASM file
      const mujocoESM = await import(/* webpackIgnore: true */ '/mujoco/mujoco_wasm.js' as never);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mj: any = await (mujocoESM as any).default();

      setStatus('loading-assets');

      mj.FS.mkdir('/working');
      mj.FS.mount(mj.MEMFS, { root: '.' }, '/working');
      mj.FS.mkdir('/working/assets');
      mj.FS.mkdir('/working/assets/robots');
      mj.FS.mkdir('/working/assets/robots/fairino5_v6');
      mj.FS.mkdir('/working/assets/gripper');
      mj.FS.mkdir('/working/assets/gripper/iai');
      mj.FS.mkdir('/working/assets/box');

      await Promise.all(
        MESH_MANIFEST.map(async ([url, fsPath]) => {
          const buf   = await fetch(url).then(r => r.arrayBuffer());
          const bytes = new Uint8Array(buf);
          mj.FS.writeFile(fsPath, bytes);
        })
      );

      const entry   = SCENES.find(s => s.id === sceneId) ?? SCENES[0];
      const xmlText = await fetch(entry.xml).then(r => r.text());
      mj.FS.writeFile('/working/scene.xml', xmlText);

      const model   = mj.MjModel.loadFromXML('/working/scene.xml');
      const simData = new mj.MjData(model);

      if (INITIAL_QPOS) {
        for (let i = 0; i < Math.min(INITIAL_QPOS.length, simData.qpos.length); i++) {
          simData.qpos[i] = INITIAL_QPOS[i];
        }
        mj.mj_forward(model, simData);
      }

      // ── Read joint metadata (hinge & slide only, skip free/ball) ──
      const MJ_OBJ_JOINT = 3;
      const njnt = model.njnt as number;
      const meta: JointMeta[] = [];
      const initVals: number[] = [];

      for (let j = 0; j < njnt; j++) {
        const type = model.jnt_type[j] as number;
        if (type === 0 || type === 1) continue; // skip free & ball
        const isHinge = type === 3;
        const name    = (mj.mj_id2name(model, MJ_OBJ_JOINT, j) ?? `joint_${j}`) as string;
        const qposadr = model.jnt_qposadr[j] as number;
        const limited = (model.jnt_limited[j] as number) !== 0;
        const min     = limited ? (model.jnt_range[j * 2]     as number) : (isHinge ? -Math.PI : -1);
        const max     = limited ? (model.jnt_range[j * 2 + 1] as number) : (isHinge ?  Math.PI :  1);
        meta.push({ name, qposadr, min, max, isHinge });
        initVals.push(simData.qpos[qposadr] as number);
      }

      setJointMeta(meta);
      setJointValues(initVals);

      applyJointRef.current = (qposadr: number, val: number) => {
        simData.qpos[qposadr] = val;
        mj.mj_forward(model, simData);
      };

      resetJointsRef.current = () => {
        mj.mj_resetData(model, simData);
        mj.mj_forward(model, simData);
        setJointValues(meta.map(j => simData.qpos[j.qposadr] as number));
      };

      // ── Three.js ──
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

      const threeScene = new THREE.Scene();
      threeScene.background = new THREE.Color('#1A3A2A');

      const rootGroup = new THREE.Group();
      rootGroup.rotation.x = -Math.PI / 2;
      threeScene.add(rootGroup);

      const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.01, 100);
      camera.position.set(0.05, 2.31, -4.03);
      camera.lookAt(0, 0, 0);

      threeScene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const sun = new THREE.DirectionalLight(0xffffff, 1.6);
      sun.position.set(2, 5, 3);
      threeScene.add(sun);
      const fillLight = new THREE.DirectionalLight(0xb8962e, 0.4);
      fillLight.position.set(-3, 2, -2);
      threeScene.add(fillLight);

      const orbitControls = new OrbitControls(camera, canvas);
      orbitControls.enablePan  = false;
      orbitControls.minDistance = 0.5;
      orbitControls.maxDistance = 12;
      orbitControls.target.set(0, 0.7, 0);
      orbitControls.update();
      orbitControls.addEventListener('change', () => {
        const p = camera.position;
        const t = orbitControls.target;
        console.log(
          `camera.position.set(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)})` +
          `\ncontrols.target.set(${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)})`
        );
      });

      const matArm     = new THREE.MeshStandardMaterial({ color: 0xc8d4cc, roughness: 0.45, metalness: 0.55 });
      const matGripper = new THREE.MeshStandardMaterial({ color: 0xb8962e, roughness: 0.40, metalness: 0.60 });
      const matBox     = new THREE.MeshStandardMaterial({ color: 0xd4af5a, roughness: 0.80, metalness: 0.10 });

      const MJ_OBJ_BODY  = 1;
      const MJ_GEOM_MESH = 7;
      const nbody: number = model.nbody;
      const ngeom: number = model.ngeom;

      const bodyObjects: THREE.Object3D[] = [];
      for (let b = 0; b < nbody; b++) {
        const obj = new THREE.Object3D();
        rootGroup.add(obj);
        bodyObjects.push(obj);
      }

      for (let g = 0; g < ngeom; g++) {
        if (model.geom_type[g] !== MJ_GEOM_MESH) continue;
        const bodyId = model.geom_bodyid[g] as number;
        const meshId = model.geom_dataid[g] as number;
        if (meshId < 0) continue;

        const vertStart = model.mesh_vertadr[meshId] as number;
        const vertCount = model.mesh_vertnum[meshId] as number;
        const faceStart = model.mesh_faceadr[meshId] as number;
        const faceCount = model.mesh_facenum[meshId] as number;

        const positions = new Float32Array(vertCount * 3);
        for (let v = 0; v < vertCount * 3; v++) positions[v] = model.mesh_vert[vertStart * 3 + v];

        const indices = new Uint32Array(faceCount * 3);
        for (let f = 0; f < faceCount * 3; f++) indices[f] = model.mesh_face[faceStart * 3 + f];

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setIndex(new THREE.BufferAttribute(indices, 1));
        geo.computeVertexNormals();

        const bodyName: string = mj.mj_id2name(model, MJ_OBJ_BODY, bodyId) ?? '';
        let mat = matArm;
        if (bodyName.includes('gripper') || bodyName.includes('pinch') || bodyName.includes('claw')) mat = matGripper;
        else if (bodyName.includes('box') || bodyName.includes('container')) mat = matBox;

        const meshObj = new THREE.Mesh(geo, mat);
        meshObj.position.set(model.geom_pos[g * 3], model.geom_pos[g * 3 + 1], model.geom_pos[g * 3 + 2]);
        meshObj.quaternion.set(
          model.geom_quat[g * 4 + 1],
          model.geom_quat[g * 4 + 2],
          model.geom_quat[g * 4 + 3],
          model.geom_quat[g * 4 + 0]
        );
        bodyObjects[bodyId].add(meshObj);
      }

      setStatus('ready');

      const resizeObserver = new ResizeObserver(() => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resizeObserver.observe(canvas);

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'p' || e.key === 'P') {
          const q = Array.from(simData.qpos as Float64Array).map((v: number) => +v.toFixed(4));
          console.log('INITIAL_QPOS:', JSON.stringify(q));
        }
      };
      window.addEventListener('keydown', onKey);

      let rafId = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        mj.mj_forward(model, simData);
        const xpos  = simData.xpos;
        const xquat = simData.xquat;
        for (let b = 0; b < nbody; b++) {
          bodyObjects[b].position.set(xpos[b * 3], xpos[b * 3 + 1], xpos[b * 3 + 2]);
          bodyObjects[b].quaternion.set(
            xquat[b * 4 + 1], xquat[b * 4 + 2], xquat[b * 4 + 3], xquat[b * 4 + 0]
          );
        }
        orbitControls.update();
        renderer.render(threeScene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        window.removeEventListener('keydown', onKey);
        renderer.forceContextLoss();
        renderer.dispose();
      };
    } catch (err) {
      console.error('[SimViewer] init failed:', err);
      setStatus('error');
      return null;
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Loading / error overlay */}
      {status !== 'ready' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-green-deep/90 backdrop-blur-sm">
          {status === 'error' ? (
            <span className="text-cream/40 text-[10px] tracking-[0.3em] uppercase font-mono">
              Simulation Unavailable
            </span>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full border border-gold border-t-transparent animate-spin" />
              <span className="text-cream/40 text-[10px] tracking-[0.3em] uppercase font-mono">
                {status === 'loading-wasm'   ? 'Loading Engine'  :
                 status === 'loading-assets' ? 'Loading Models'  :
                 'Initializing'}
              </span>
            </>
          )}
        </div>
      )}

      {/* Live badge */}
      {status === 'ready' && (
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-deep/85 px-3 py-1 rounded-full pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-[9px] tracking-[0.2em] uppercase font-mono">Live</span>
        </div>
      )}

      {/* ── Control panel ── */}
      {status === 'ready' && (
        <div className="absolute top-0 right-0 bottom-0 w-36 md:w-52 flex flex-col bg-[#081510]/92 backdrop-blur-md border-l border-cream/10">

          {/* Scene selector */}
          <div className="px-2 pt-3 pb-2 md:px-4 md:pt-4 md:pb-3 border-b border-cream/10 flex-shrink-0">
            <span className="text-cream/30 text-[8px] tracking-[0.3em] uppercase font-mono block mb-2">
              Scene
            </span>
            <div className="relative">
              <select
                value={sceneId}
                onChange={e => setSceneId(e.target.value)}
                className="w-full bg-transparent text-cream/80 text-[10px] font-mono border border-cream/15 px-2.5 py-1.5 pr-7 focus:outline-none focus:border-gold/50 appearance-none cursor-pointer"
              >
                {SCENES.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#081510]">{s.label}</option>
                ))}
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-cream/25 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Joints header */}
          <div className="px-2 py-1.5 md:px-4 md:py-2.5 border-b border-cream/10 flex-shrink-0 flex items-center justify-between">
            <span className="text-cream/30 text-[8px] tracking-[0.3em] uppercase font-mono">Joints</span>
            <button
              onClick={handleReset}
              className="text-cream/20 text-[8px] tracking-[0.2em] font-mono uppercase hover:text-gold/60 transition-colors duration-150"
            >
              Reset
            </button>
          </div>

          {/* Joint sliders */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3 md:px-4 md:py-3 md:space-y-5" style={{ scrollbarWidth: 'none' }}>
            {jointMeta.length === 0 && (
              <p className="text-cream/20 text-[9px] font-mono text-center pt-6">No joints found</p>
            )}
            {jointMeta.map((j, i) => {
              const val     = jointValues[i] ?? 0;
              const display = j.isHinge
                ? `${(val * 180 / Math.PI).toFixed(1)}°`
                : `${val.toFixed(3)} m`;
              return (
                <div key={j.name}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-cream/35 text-[8px] tracking-[0.08em] uppercase font-mono truncate mr-2 max-w-[68px] md:max-w-[110px]">
                      {j.name.replace(/_/g, ' ')}
                    </span>
                    <span className="text-gold text-[9px] font-mono tabular-nums flex-shrink-0">
                      {display}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={j.min}
                    max={j.max}
                    step={j.isHinge ? 0.01 : 0.001}
                    value={val}
                    onChange={e => handleJointChange(i, j.qposadr, parseFloat(e.target.value))}
                    className="
                      w-full h-px bg-cream/15 appearance-none cursor-pointer outline-none
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-3
                      [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-gold
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:transition-transform
                      [&::-webkit-slider-thumb]:duration-100
                      [&::-webkit-slider-thumb]:hover:scale-125
                      [&::-moz-range-thumb]:w-3
                      [&::-moz-range-thumb]:h-3
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-gold
                      [&::-moz-range-thumb]:border-0
                      [&::-moz-range-thumb]:cursor-pointer
                    "
                  />
                </div>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="px-2 py-1.5 md:px-4 md:py-2.5 border-t border-cream/10 flex-shrink-0">
            <p className="text-cream/15 text-[7px] tracking-[0.2em] font-mono uppercase">
              Press P · log qpos
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
