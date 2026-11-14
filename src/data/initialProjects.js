export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "DevCanvas Pro",
    tagline: "Collaborative real-time infinite whiteboard for engineering teams",
    description: "DevCanvas Pro is an ultra-fast, multiplayer whiteboard built specifically for software architects and distributed engineering teams. It allows real-time diagramming of cloud topologies, interactive system design walkthroughs, and instant export to infrastructure-as-code templates. The canvas engine operates at 60 FPS even with over 10,000 synchronized entities.",
    category: "Web Dev",
    techStack: ["React", "TypeScript", "WebSockets", "Canvas API", "Tailwind CSS", "Node.js"],
    author: {
      name: "Alex Rivera",
      role: "Full Stack Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      github: "https://github.com/alexrivera/devcanvas"
    },
    githubUrl: "https://github.com/alexrivera/devcanvas",
    liveDemoUrl: "https://devcanvas-demo.vercel.app",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
    architectureHighlights: [
      "CRDT-based conflict-free real-time state synchronization via WebSockets",
      "Custom 2D spatial indexing (QuadTree) for zero-lag viewport clipping",
      "Web Worker thread offloading for heavy bezier curve & SVG parsing",
      "Export directly to Terraform & AWS CloudFormation definitions"
    ],
    upvotes: 342,
    featured: true,
    createdAt: "2026-10-15T10:00:00Z"
  },
  {
    id: "proj-2",
    title: "NeuroVision Edge",
    tagline: "Sub-15ms on-device object detection & telemetry for robotics",
    description: "NeuroVision Edge is an ultra-lightweight computer vision pipeline optimized for embedded ARM devices and micro-robotics. It combines quantized YOLOv8 neural nets with WebAssembly acceleration in the browser for remote fleet monitoring. Features zero cloud dependency, autonomous edge inference, and encrypted visual telemetry streaming.",
    category: "AI/ML",
    techStack: ["Python", "TensorFlow Lite", "FastAPI", "WebAssembly", "OpenCV", "React"],
    author: {
      name: "Sophia Chen",
      role: "AI & Robotics Researcher",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      github: "https://github.com/sophiachen/neurovision"
    },
    githubUrl: "https://github.com/sophiachen/neurovision",
    liveDemoUrl: "https://neurovision-edge.io",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    gradient: "from-cyan-500 via-teal-600 to-emerald-600",
    architectureHighlights: [
      "INT8 post-training quantization reducing model footprint to 6.2 MB",
      "Simultaneous multithreaded edge video decoding with zero-copy buffers",
      "Adaptive frame-skipping algorithm based on sensor motion delta",
      "WASM client dashboard rendering live bounding boxes with 60fps telemetry"
    ],
    upvotes: 489,
    featured: true,
    createdAt: "2026-10-22T14:30:00Z"
  },
  {
    id: "proj-3",
    title: "SentinelDDoS",
    tagline: "Kernel-level eBPF packet inspection and automated mitigation shield",
    description: "SentinelDDoS attaches high-performance eBPF filters directly to the Linux XDP network driver stage. It inspects millions of incoming packets per second per core, applies heuristic anomaly scoring in microsecond windows, and drops malicious volumetric attacks before they ever reach user space or socket buffers.",
    category: "Cybersecurity",
    techStack: ["Go", "C / eBPF", "Rust", "React", "Grafana", "Prometheus"],
    author: {
      name: "Marcus Vance",
      role: "SecOps & Kernel Dev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      github: "https://github.com/marcusvance/sentinel-ddos"
    },
    githubUrl: "https://github.com/marcusvance/sentinel-ddos",
    liveDemoUrl: "https://sentinel-shield.dev",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    gradient: "from-rose-600 via-red-600 to-amber-600",
    architectureHighlights: [
      "XDP (eXpress Data Path) kernel driver hooks processing 14M+ pps per core",
      "Lockless ring-buffer telemetry export to Go userspace daemon",
      "Dynamic IP reputation updates via peer-to-peer gossip protocol",
      "Live web dashboard featuring real-time attack geography & packet classification"
    ],
    upvotes: 275,
    featured: false,
    createdAt: "2026-10-28T09:15:00Z"
  },
  {
    id: "proj-4",
    title: "OmniGuard IoT",
    tagline: "Mesh-connected environmental monitor with solar energy harvesting",
    description: "OmniGuard IoT is an autonomous outdoor environmental monitoring station powered by ESP32 microcontrollers and LoRaWAN mesh communication. Nodes track air particulate matter (PM2.5/PM10), UV radiation, temperature, and soil moisture across agricultural zones, operating indefinitely using micro solar cells and supercapacitors.",
    category: "IoT/Hardware",
    techStack: ["C++ / Arduino", "ESP32", "LoRaWAN", "MQTT", "Next.js", "Tailwind CSS"],
    author: {
      name: "Priya Patel",
      role: "Hardware Systems Architect",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      github: "https://github.com/priyapatel/omniguard-iot"
    },
    githubUrl: "https://github.com/priyapatel/omniguard-iot",
    liveDemoUrl: "https://omniguard.green",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    architectureHighlights: [
      "Sub-gigahertz LoRa mesh networking delivering 12km non-line-of-sight range",
      "Ultra-low power deep sleep states consuming under 15 microamps idle",
      "MPPT (Maximum Power Point Tracking) battery management IC integration",
      "Secure MQTT-over-TLS telemetry bridge to web dashboard"
    ],
    upvotes: 198,
    featured: false,
    createdAt: "2026-11-01T16:45:00Z"
  },
  {
    id: "proj-5",
    title: "PulseHealth Mobile",
    tagline: "Offline-first biometric vitals tracker & medication adherence companion",
    description: "PulseHealth is an open-source cross-platform mobile application providing HIPAA-compliant health tracking with zero cloud lock-in. It pairs with BLE fitness monitors, tracks heart rate variability (HRV), logs medication schedules with smart local push notifications, and generates encrypted PDF reports for physicians.",
    category: "Mobile Apps",
    techStack: ["React Native", "Expo", "SQLite", "TypeScript", "Tailwind CSS", "HealthKit"],
    author: {
      name: "David Kim",
      role: "Mobile App Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      github: "https://github.com/davidkim/pulsehealth"
    },
    githubUrl: "https://github.com/davidkim/pulsehealth",
    liveDemoUrl: "https://pulsehealth.app",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    architectureHighlights: [
      "Offline-first encrypted SQLite storage using SQLCipher AES-256",
      "Low-energy Bluetooth (BLE 5.2) GATT profile communication listener",
      "Custom HRV time-domain metric calculation algorithms",
      "Zero biometric data transmission to external servers"
    ],
    upvotes: 310,
    featured: true,
    createdAt: "2026-11-04T11:20:00Z"
  },
  {
    id: "proj-6",
    title: "QuantumKey Vault",
    tagline: "Post-quantum lattice-based credential manager and secrets enclave",
    description: "QuantumKey is a zero-knowledge developer secrets manager hardened against future quantum computer decryption. It implements NIST-standardized Kyber and Dilithium cryptographic algorithms alongside traditional Argon2id key derivation, providing a CLI and local web interface for team environment variable synchronization.",
    category: "Cybersecurity",
    techStack: ["Rust", "WebAssembly", "React", "Tauri", "Post-Quantum Crypto"],
    author: {
      name: "Elena Rostova",
      role: "Cryptographic Engineer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      github: "https://github.com/elenarostova/quantumkey"
    },
    githubUrl: "https://github.com/elenarostova/quantumkey",
    liveDemoUrl: "https://quantumkey.security",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    gradient: "from-amber-500 via-rose-600 to-purple-700",
    architectureHighlights: [
      "ML-KEM (Kyber-768) lattice-based key encapsulation mechanism",
      "Zero-knowledge proof validation of team membership without password exchange",
      "Memory-safe Rust enclave compiled to WebAssembly with secure memory zeroing",
      "Automated secret scanning and rotators for AWS, GCP, and GitHub tokens"
    ],
    upvotes: 421,
    featured: true,
    createdAt: "2026-11-07T08:00:00Z"
  },
  {
    id: "proj-7",
    title: "CodeMorph AI",
    tagline: "AST-aware multi-language refactoring and legacy code migration assistant",
    description: "CodeMorph parses legacy codebases into Abstract Syntax Trees (AST) and leverages fine-tuned code models to perform semantic migrations (e.g. jQuery to React 18, Python 2 to 3.12, CommonJS to ESM) with automatic unit test generation that guarantees functional equivalence.",
    category: "AI/ML",
    techStack: ["TypeScript", "Tree-Sitter", "OpenAI API", "React", "Monaco Editor"],
    author: {
      name: "Tariq Al-Mansoor",
      role: "Compiler & ML Engineer",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      github: "https://github.com/tariq/codemorph"
    },
    githubUrl: "https://github.com/tariq/codemorph",
    liveDemoUrl: "https://codemorph.ai",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    gradient: "from-cyan-600 via-blue-600 to-indigo-800",
    architectureHighlights: [
      "Tree-Sitter AST grammar parsing for 12+ programming languages",
      "Deterministic mutation testing to verify semantic behavior before/after transforms",
      "Split-diff Monaco code viewer with inline AI change explanations",
      "Local CLI runner that integrates into CI/CD pipelines"
    ],
    upvotes: 260,
    featured: false,
    createdAt: "2026-11-09T13:10:00Z"
  },
  {
    id: "proj-8",
    title: "AeroTrack FlightHUD",
    tagline: "3D real-time airspace radar with ADS-B receiver telemetry streaming",
    description: "AeroTrack connects to DIY RTL-SDR radio dongles to capture 1090MHz ADS-B transponder bursts from commercial aircraft within 250 miles. It plots 3D flight trajectories, altitude profiles, and speed vectors on a GPU-accelerated CesiumJS globe with zero external flight radar API subscriptions.",
    category: "Web Dev",
    techStack: ["React", "Three.js / Cesium", "WebSockets", "Node.js", "RTL-SDR"],
    author: {
      name: "Jordan Lee",
      role: "Avionics Enthusiast & WebGL Dev",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
      github: "https://github.com/jordanlee/aerotrack"
    },
    githubUrl: "https://github.com/jordanlee/aerotrack",
    liveDemoUrl: "https://aerotrack-hud.live",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80",
    gradient: "from-sky-500 via-indigo-600 to-blue-900",
    architectureHighlights: [
      "Hardware RTL-SDR radio USB decoding via Node.js native addon",
      "GPU-accelerated 3D flight vectors rendered at 60 FPS using WebGL",
      "Kalman filter state prediction for lost transponder ping intervals",
      "Dynamic weather radar overlays and METAR airport conditions"
    ],
    upvotes: 388,
    featured: true,
    createdAt: "2026-11-11T17:30:00Z"
  }
];

export const CATEGORIES = [
  "All",
  "Web Dev",
  "AI/ML",
  "IoT/Hardware",
  "Mobile Apps",
  "Cybersecurity"
];

export const POPULAR_TAGS = [
  "React",
  "Python",
  "TypeScript",
  "Rust",
  "WebAssembly",
  "TensorFlow",
  "eBPF",
  "WebSockets",
  "ESP32",
  "Tailwind CSS"
];
