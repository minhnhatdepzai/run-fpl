(function runFplBrand() {
  const saveKey = "claybound-v1";
  const migrationKey = "run-fpl-v4";
  const languageKey = "run-fpl-language";

  try {
    const saved = JSON.parse(localStorage.getItem(saveKey) || "{}");
    const firstRun = localStorage.getItem(migrationKey) !== "done";
    const next = {
      ...saved,
      analytics: false,
      labUnlocked: true,
      charactersUnlocked: true,
      stopMotion: false,
      stopMotionChosen: true,
      bulletTime: false,
      bulletTimeChosen: true,
      // v4 makes the blue robot cat the real default, including for people
      // who opened an earlier Run FPL build before the character was added.
      ...(firstRun ? { character: "clay" } : {}),
    };
    localStorage.setItem(saveKey, JSON.stringify(next));
    localStorage.setItem(migrationKey, "done");
  } catch {
    // The game still runs when storage is unavailable.
  }

  const icon = (path) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${path}"/></svg>`;

  const links = [
    {
      label: "Facebook — Lê Minh Nhật",
      url: "https://www.facebook.com/le.nhat.492484",
      path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.98h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z",
    },
    {
      label: "GitHub — minhnhatdepzai",
      url: "https://github.com/minhnhatdepzai",
      path: "M12 .7a11.3 11.3 0 0 0-3.57 22c.57.1.77-.25.77-.55v-2.2c-3.14.68-3.8-1.33-3.8-1.33-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.51-2.5-.29-5.14-1.26-5.14-5.59 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.11 1.16A10.8 10.8 0 0 1 12 5.1c.96 0 1.93.13 2.83.38 2.16-1.47 3.11-1.16 3.11-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.34-2.64 5.3-5.15 5.58.41.35.77 1.04.77 2.1v4.12c0 .31.2.66.78.55A11.3 11.3 0 0 0 12 .7Z",
    },
    {
      label: "Email — lnhat1938@gmail.com",
      url: "mailto:lnhat1938@gmail.com?subject=Run%20FPL",
      path: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2-.5L12 11.1 19.8 5H4.2ZM20 7.1l-7.38 5.77a1 1 0 0 1-1.24 0L4 7.1v11.4c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V7.1Z",
    },
  ];

  const socialMarkup = links
    .map(
      ({ label, url, path }) =>
        `<a href="${url}" ${url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""} aria-label="${label}" title="${label}">${icon(path)}</a>`,
    )
    .join("");

  const worlds = [
    [0, "🏜️", "Hẻm núi", "Canyon"],
    [1, "🌋", "Hang lửa", "Ember cave"],
    [2, "🌳", "Rừng thở", "Wildwood"],
    [3, "🏙️", "Phố treo", "Sky city"],
    [4, "🌙", "Giấc mơ", "Dream"],
    [5, "🏛️", "Mỏ cẩm thạch", "Marble quarry"],
    [6, "🥚", "Đường trứng", "Egg run"],
    [7, "🔥", "Đêm nung", "Fired night"],
  ];

  const translations = [
    ["Play", "Chơi"], ["Continue", "Tiếp tục"], ["Play Again", "Chơi lại"],
    ["Worlds", "Phong cảnh"], ["Settings", "Cài đặt"], ["SETTINGS", "CÀI ĐẶT"],
    ["Make yourself at home.", "Tùy chỉnh theo ý bạn."],
    ["Choose your world.", "Chọn phong cảnh của bạn."],
    ["Choose your path.", "Chọn phong cảnh của bạn."],
    ["EIGHT CHAPTERS · THE LAB & THE KILN", "TÁM PHONG CẢNH · PHÒNG THÍ NGHIỆM & LÒ NUNG"],
    ["Music", "Nhạc"], ["Effects", "Hiệu ứng"], ["Sound", "Âm thanh"],
    ["On", "Bật"], ["Off", "Tắt"], ["Fullscreen", "Toàn màn hình"],
    ["Exit fullscreen", "Thoát toàn màn hình"], ["Rumble", "Rung"],
    ["Stop motion", "Chuyển động giật khung"], ["Usage stats", "Thống kê sử dụng"],
    ["How to play", "Cách chơi"], ["Level editor", "Trình tạo màn"], ["Credits", "Thông tin"],
    ["Anime character", "Nhân vật anime"], ["Character", "Nhân vật"],
    ["Language", "Ngôn ngữ"], ["English", "Tiếng Anh"], ["Vietnamese", "Tiếng Việt"],
    ["HOW TO PLAY", "CÁCH CHƠI"], ["Controls.", "Điều khiển."],
    ["A / D or ← / → to move", "A / D hoặc ← / → để di chuyển"],
    ["Space, W or ↑ to jump", "Space, W hoặc ↑ để nhảy"],
    ["S or ↓ to stomp in the air", "S hoặc ↓ để dậm xuống khi đang ở trên không"],
    ["Hold E near violet clay to knead it", "Giữ E gần đất sét tím để nhào nặn"],
    ["R to restart from the last checkpoint", "R để chơi lại từ điểm lưu gần nhất"],
    ["Esc to pause", "Esc để tạm dừng"], ["PAUSED", "TẠM DỪNG"],
    ["Take a breath.", "Nghỉ một chút nhé."], ["Resume", "Tiếp tục"],
    ["Restart chapter", "Chơi lại phong cảnh"], ["Back to Title", "Về màn hình chính"],
    ["Chapters", "Phong cảnh"], ["Back to settings", "Quay lại cài đặt"],
    ["Close settings", "Đóng cài đặt"], ["Close chapters", "Đóng danh sách phong cảnh"],
    ["Close help", "Đóng hướng dẫn"], ["Pause game", "Tạm dừng trò chơi"],
    ["Enter fullscreen", "Bật toàn màn hình"], ["Mute sound", "Tắt âm thanh"],
    ["Game controls", "Điều khiển trò chơi"], ["Dismiss hint", "Đóng gợi ý"],
    ["Turn your phone", "Xoay điện thoại"],
    ["Turn sideways. There's more to see.", "Hãy xoay ngang để nhìn thấy nhiều hơn."],
    ["Keep playing in portrait", "Tiếp tục chơi theo chiều dọc"],
    ["MOVE", "DI CHUYỂN"], ["STOMP", "DẬM"], ["JUMP", "NHẢY"],
    ["TAP · HOLD = HIGHER", "CHẠM · GIỮ = NHẢY CAO"], ["Skip", "Bỏ qua"],
    ["Workshop playtest", "Chơi thử màn tự tạo"], ["Back to editor", "Quay lại trình tạo"],
    ["A little hiccup.", "Có một lỗi nhỏ."], ["Try again", "Thử lại"],
    ["Get updates by email", "Nhận cập nhật qua email"],
    ["Loading anime worlds…", "Đang tải các thế giới anime…"],
    ["Warming up the clay…", "Đang làm nóng đất sét…"],
    ["Shaping the canyon…", "Đang tạo hình hẻm núi…"],
    ["Sunbaked Canyon", "Hẻm Núi Rực Nắng"], ["Ember Caverns", "Hang Động Dung Nham"],
    ["Breathing Wildwood", "Khu Rừng Biết Thở"], ["Elastic Wildwood", "Khu Rừng Đàn Hồi"],
    ["Hanging Quarter", "Khu Phố Trên Không"], ["Soft Dream", "Giấc Mơ Êm Dịu"],
    ["Marble Quarry", "Mỏ Đá Cẩm Thạch"], ["Egg Run (WIP)", "Đường Trứng (đang hoàn thiện)"],
    ["Canyon · Fired, Alone", "Hẻm Núi · Đêm Nung Cô Độc"],
    ["Clay lab", "Phòng thí nghiệm đất sét"],
    ["Twenty-four experiments in what clay does", "Hai mươi bốn thử nghiệm về đặc tính đất sét"],
    ["The Endless Kiln", "Lò Nung Vô Tận"], ["Every firing a new world", "Mỗi lần nung là một thế giới mới"],
    ["CHAPTER ONE", "PHONG CẢNH MỘT"], ["CHAPTER TWO", "PHONG CẢNH HAI"],
    ["CHAPTER THREE", "PHONG CẢNH BA"], ["CHAPTER FOUR", "PHONG CẢNH BỐN"],
    ["CHAPTER FIVE", "PHONG CẢNH NĂM"], ["CHAPTER SIX", "PHONG CẢNH SÁU"],
    ["CHAPTER SEVEN", "PHONG CẢNH BẢY"], ["CHAPTER EIGHT", "PHONG CẢNH TÁM"],
    ["Chapter complete", "Hoàn thành phong cảnh"], ["Next Chapter", "Phong cảnh tiếp theo"],
    ["Restart", "Chơi lại"], ["Home", "Trang chính"], ["Rare", "Hiếm"],
    ["Legendary", "Huyền thoại"], ["none", "không có"], ["Checkpoint saved", "Đã lưu điểm"],
    ["Sound preferences and progress save on this device. Usage stats are anonymous — which chapters are played, how well the game runs and, for some visits, a low-resolution recording of the screen — and are only ever sent from the hosted game.", "Âm thanh, ngôn ngữ và tiến trình được lưu trên thiết bị này. Thống kê sử dụng đã được tắt trong Run FPL."],
    ["On a phone, drag the joystick — farther to run. A controller's left stick or d-pad steers too.", "Trên điện thoại, kéo cần điều khiển; kéo xa hơn để chạy. Tay cầm cũng hỗ trợ cần trái hoặc phím điều hướng."],
    ["Hold for a longer leap. Land on claylings to squish them. On a phone, the JUMP button; on a controller, A or Y.", "Giữ phím để nhảy xa hơn. Tiếp đất lên quái đất sét để hạ chúng. Trên điện thoại dùng nút NHẢY; trên tay cầm dùng A hoặc Y."],
    ["Breaks sealed caps, drops you through thin ledges, bounces you higher off mushrooms. On a phone, the STOMP button; on a controller, B or X.", "Phá nắp bị khóa, xuyên qua bệ mỏng và bật cao hơn trên nấm. Trên điện thoại dùng nút DẬM; trên tay cầm dùng B hoặc X."],
    ["This world needs WebGL. Try updating your browser or enabling hardware acceleration.", "Trò chơi cần WebGL. Hãy cập nhật trình duyệt hoặc bật tăng tốc phần cứng."],
    ["TAKE YOUR TIME", "CỨ TỪ TỪ"], ["A little breather.", "Tạm nghỉ một chút."],
    ["Keep going", "Chơi tiếp"], ["Start over", "Chơi lại từ đầu"], ["Controls", "Điều khiển"],
    ["Return to title", "Về màn hình chính"], ["Let's leap", "Bắt đầu chơi"],
    ["Violet clay can be shaped", "Đất sét tím có thể tạo hình"],
    ["Tap or drag it, hold E, or stomp it — violet clay breathes when you are beside it and stretches into ramps, stairs and bridges. R softens it back. On a controller, the right stick drags it, the left trigger is E, holding the right stick in is R, and the bumpers move the hand along the clay and between pieces.", "Chạm hoặc kéo, giữ E hay dậm xuống để tạo hình đất sét tím thành dốc, cầu thang và cây cầu. R đưa nó về trạng thái mềm. Với tay cầm: cần phải để kéo, cò trái tương ứng E, nhấn giữ cần phải tương ứng R, hai nút vai để di chuyển bàn tay."],
    ["Arrows or W / A / S / D steer the menus", "Phím mũi tên hoặc W / A / S / D để điều khiển menu"],
    ["Enter or Space chooses, Escape backs out. On a controller: d-pad or stick, A to choose, B to go back.", "Enter hoặc Space để chọn, Escape để quay lại. Với tay cầm: dùng phím điều hướng hoặc cần, A để chọn và B để quay lại."],
    ["Ring the bell at the end of each chapter", "Rung chuông ở cuối mỗi phong cảnh"],
    ["Orange flags save your place. Collect beads and hidden flowers.", "Cờ màu cam lưu vị trí. Hãy thu thập hạt và những bông hoa ẩn."],
    ["Breaks sealed caps, drops you through thin ledges, bounces you higher off mushrooms. On a phone, the STOMP button; on a controller, B, X or a trigger.", "Phá nắp bị khóa, xuyên qua bệ mỏng và bật cao hơn trên nấm. Trên điện thoại dùng nút DẬM; trên tay cầm dùng B, X hoặc cò."],
    ["The Sunbaked Canyon", "Hẻm Núi Rực Nắng"], ["The Ember Caverns", "Hang Động Dung Nham"],
    ["The Breathing Wildwood", "Khu Rừng Biết Thở"], ["The Elastic Wildwood", "Khu Rừng Đàn Hồi"],
    ["The Hanging Quarter", "Khu Phố Trên Không"], ["The Soft Dream", "Giấc Mơ Êm Dịu"],
    ["The Marble Quarry", "Mỏ Đá Cẩm Thạch"], ["The Caravan Steps", "Bậc Thang Lữ Hành"],
    ["The Sinking Shortcut", "Lối Tắt Sụt Lún"], ["The Sandwright's Pocket", "Hốc Cát Bí Mật"],
    ["Wake the Windwell", "Đánh Thức Giếng Gió"], ["The Sky-Sand Run", "Đường Chạy Cát Trời"],
    ["Inside the Great Arch", "Bên Trong Đại Vòm"], ["The Summit Ropeway", "Cáp Treo Đỉnh Núi"],
    ["The Echo Switchback", "Khúc Quanh Vọng Âm"], ["The Furnace Ferry", "Phà Lò Nung"],
    ["The Turning Heart", "Trái Tim Chuyển Động"], ["The Sunken Relay", "Trạm Chuyển Tiếp Chìm"],
    ["The Spitters’ Gallery", "Hành Lang Quái Phun"], ["The Last Light", "Ánh Sáng Cuối Cùng"],
    ["The Familiar Rooftops", "Những Mái Nhà Thân Quen"], ["Counterweight Court", "Sân Đối Trọng"],
    ["Laundry Switchbacks", "Khúc Quanh Dây Phơi"], ["Gondola Exchange", "Trạm Cáp Treo"],
    ["The Sky Bell", "Chuông Trời"], ["Forest Floor", "Tầng Rừng"],
    ["Springwood", "Rừng Lò Xo"], ["Pinball Grove", "Rừng Pinball"],
    ["High Branches", "Những Cành Cao"], ["The Stilled Grove", "Khu Rừng Lặng Yên"],
    ["The Responsive Wood", "Khu Rừng Hồi Đáp"], ["Elastic Canopy", "Tán Rừng Đàn Hồi"],
    ["The Still Clearing", "Khoảng Rừng Tĩnh Lặng"], ["First Breath", "Hơi Thở Đầu Tiên"],
    ["The Blowholes", "Những Hốc Gió"], ["The Spore Hollow", "Hang Bào Tử"],
    ["The Gill Stair", "Cầu Thang Phiến Nấm"], ["The Fading Breath", "Hơi Thở Phai Dần"],
    ["Move and jump", "Di chuyển và nhảy"],
    ["‹A› ‹D› or ‹←› ‹→› to move. ‹Space›, ‹W› or ‹↑› to jump — hold it to go higher.", "Dùng ‹A› ‹D› hoặc ‹←› ‹→› để di chuyển. Dùng ‹Space›, ‹W› hoặc ‹↑› để nhảy; giữ phím để nhảy cao hơn."],
    ["Crumbling ledges", "Bệ đang sụp"], ["Keep moving — cracked ledges crumble.", "Hãy tiếp tục di chuyển — những bệ nứt sẽ sụp xuống."],
    ["Raise a ramp", "Nâng đường dốc"], ["Shape a ramp", "Tạo đường dốc"],
    ["Activate wind", "Kích hoạt luồng gió"], ["Step on the valve — the wind lifts your jumps.", "Bước lên van — luồng gió sẽ nâng cú nhảy của bạn."],
    ["Ride the ropeway", "Đi cáp treo"], ["Ride the ropeway — it will carry you down.", "Bước lên cáp treo — nó sẽ đưa bạn xuống dưới."],
    ["Take hold of the purple clay", "Nắm lấy đất sét tím"], ["Shape the clay to match", "Tạo đất sét theo khuôn"],
    ["Steer the ferry", "Điều khiển chiếc phà"], ["Stand on a ferry edge to steer that way.", "Đứng lên mép phà để điều khiển theo hướng đó."],
    ["Start the gears", "Khởi động bánh răng"], ["Step on the plate to start the gears.", "Bước lên bàn đạp để khởi động bánh răng."],
    ["Counterweight", "Đối trọng"], ["Press the floor", "Ấn nền xuống"],
    ["Pink clay bounces", "Đất sét hồng nảy lên"], ["Shape it", "Tạo hình nó"],
    ["The forest breathes out", "Khu rừng đang thở"], ["Jump into the rising spores.", "Nhảy vào luồng bào tử đang bay lên."],
    ["Give the forest a breath", "Mang hơi thở lại cho khu rừng"], ["The bell", "Chiếc chuông"],
    ["Stomp on the bell to ring it. Every ring swings it further.", "Dậm lên chuông để rung. Mỗi lần rung, chuông sẽ đu xa hơn."],
    ["The bronze bell", "Chuông đồng"], ["The counterweight", "Đối trọng"],
    ["Raise the clay", "Nâng đất sét"], ["Someone is under the slab", "Có người mắc kẹt dưới phiến đá"],
    ["Down off the plateau to the clay riverbed, then up the long wall to the ropeway.", "Đi từ cao nguyên xuống lòng sông đất sét, rồi leo lên bức tường dài để đến cáp treo."],
    ["Follow the light cables. The way forward sometimes begins above — or below.", "Đi theo những sợi cáp phát sáng. Đường đi tiếp đôi khi bắt đầu ở phía trên — hoặc phía dưới."],
    ["Everything you have learned hangs over this city. Knead the last bridge to the sky bell.", "Mọi điều bạn đã học đều hội tụ trên thành phố này. Hãy tạo cây cầu cuối cùng để đến chuông trời."],
    ["Somewhere between sleeping and waking, the clay forgot its rules.", "Ở đâu đó giữa mơ và tỉnh, đất sét đã quên mất những quy luật của nó."],
    ["The forest is soft, and something is making it stiff. Jump on the pink: it gives back what it is given.", "Khu rừng vốn mềm mại nhưng có thứ đang làm nó đông cứng. Hãy nhảy lên phần màu hồng: nó sẽ hoàn trả lực nhận được."],
    ["A quarry of white marble, its statues still being cut. Every rope has two ends; ring the bronze bell by midnight, then go down to Atlas.", "Một mỏ cẩm thạch trắng với những bức tượng còn dang dở. Mọi sợi dây đều có hai đầu; hãy rung chuông đồng trước nửa đêm rồi đi xuống gặp Atlas."],
    ["Tools and contact for Lê Minh Nhật", "Công cụ và liên hệ Lê Minh Nhật"],
    ["Portfolio of Lê Minh Nhật", "Portfolio của Lê Minh Nhật"],
    ["Open Lê Minh Nhật's portfolio", "Mở portfolio của Lê Minh Nhật"],
    ["Call 0707 193 002", "Gọi 0707 193 002"],
    ["Drag to move. Tap ‹JUMP› to leap — hold it to go higher.", "Kéo để di chuyển. Chạm ‹NHẢY› để nhảy — giữ để nhảy cao hơn."],
    ["Drag to move. Tap", "Kéo để di chuyển. Chạm"], ["to leap — hold it to go higher.", "để nhảy — giữ để nhảy cao hơn."],
    ["Drag the purple clay up beside the high ledge with your finger.", "Dùng ngón tay kéo đất sét tím lên cạnh bờ cao."],
    ["Drag the clay's left side down with your finger.", "Dùng ngón tay kéo phía trái của đất sét xuống."],
    ["Touch the purple clay by the high ledge, hold, and drag up. It rises into a ramp.", "Chạm đất sét tím cạnh bờ cao, giữ và kéo lên. Nó sẽ tạo thành đường dốc."],
    ["Drag the purple clay up under the boulder with your finger until it rolls off the edge.", "Dùng ngón tay kéo đất sét tím lên dưới tảng đá cho tới khi nó lăn khỏi mép."],
    ["Drag the purple clay up under the boulder with your finger.", "Dùng ngón tay kéo đất sét tím lên dưới tảng đá."],
    ["Shape it with your finger, or press STOMP in the air.", "Tạo hình bằng ngón tay hoặc nhấn DẬM khi đang trên không."],
    ["Shape it with your finger, or press", "Tạo hình bằng ngón tay hoặc nhấn"], ["in the air.", "khi đang trên không."],
    ["Stomp the porous clay away: tap ‹STOMP› in the air. Then fix the gap with the purple block.", "Dậm vỡ đất sét xốp: chạm ‹DẬM› khi đang trên không. Sau đó dùng khối tím lấp khoảng trống."],
    ["Stomp the porous clay away: tap", "Dậm vỡ đất sét xốp: chạm"], ["in the air. Then fix the gap with the purple block.", "khi đang trên không. Sau đó dùng khối tím lấp khoảng trống."],
    ["Drag the violet clay up into the pale steps with your finger.", "Dùng ngón tay kéo đất sét tím lên theo các bậc sáng màu."],
    ["Drag the purple clay up into the pale steps with your finger.", "Dùng ngón tay kéo đất sét tím lên theo các bậc sáng màu."],
    ["Drag a tooth out of the clay ring with your finger.", "Dùng ngón tay kéo một chiếc răng ra khỏi vòng đất sét."],
    ["Raise the violet clay under it: drag it up with your finger.", "Dùng ngón tay kéo đất sét tím bên dưới lên."],
    ["Push the purple block off the branch onto the raft and step aboard. Then press the clay with your finger, hold, and drag up into a tall fin. The wind takes the raft once the sail is tall enough.", "Đẩy khối tím khỏi cành xuống bè rồi bước lên. Sau đó nhấn giữ đất sét và kéo thành cánh buồm cao. Khi buồm đủ cao, gió sẽ đưa bè đi."],
    ["Push the purple block onto the raft and raise it into a sail — drag it up with your finger. Taller sails go faster.", "Đẩy khối tím lên bè rồi dùng ngón tay kéo thành cánh buồm. Buồm càng cao, bè đi càng nhanh."],
    ["Drag the violet clay up with your finger: it grows into a brace and lifts the fallen stone back up.", "Dùng ngón tay kéo đất sét tím lên: nó sẽ thành trụ chống và nâng phiến đá đổ."],
    ["Drag the violet clay back along the crane’s tail with your finger. The further back it lies, the higher the hook lifts.", "Dùng ngón tay kéo đất sét tím lùi dọc theo đuôi cần cẩu. Càng kéo xa, móc cẩu càng nâng cao."],
    ["Drag the purple clay up under the slab with your finger.", "Dùng ngón tay kéo đất sét tím lên dưới phiến đá."],
    ["Drag the purple clay up under the slab's free end with your finger.", "Dùng ngón tay kéo đất sét tím lên dưới đầu tự do của phiến đá."],
    ["A plug pushed onto standing rot dissolves and comes back. Hop the plug, press STOMP in the air over the rot, then push.", "Nút chặn đẩy vào vùng mục sẽ tan rồi trở lại. Nhảy qua nút, nhấn DẬM trên vùng mục rồi tiếp tục đẩy."],
    ["There is a walk up there, out of reach. This thin mat barely bounces: drag it up into a deep pile with your finger, then jump from the crest.", "Có lối đi ở phía trên nhưng chưa thể với tới. Tấm đệm mỏng nảy rất ít; dùng ngón tay kéo thành đống dày rồi nhảy từ đỉnh."],
    ["Drag a trench down under each lintel with your finger. The far bed's spoil, gathered at the end, is the only step up to the stone foot.", "Dùng ngón tay kéo một rãnh dưới mỗi xà ngang. Đất đào từ luống xa, gom ở cuối, là bậc duy nhất lên chân đá."],
    ["Drag the violet turf up under the egg with your finger.", "Dùng ngón tay kéo nền tím lên dưới quả trứng."],
    ["Drag the violet turf up under the egg with your finger. Eggs stop in hollows: drag the cup’s rim in to send it on.", "Dùng ngón tay kéo nền tím lên dưới quả trứng. Trứng dừng trong chỗ lõm; kéo mép hố vào trong để nó tiếp tục lăn."],
    ["Left stick or d-pad to move. Press A to jump — hold it to go higher.", "Dùng cần trái hoặc phím điều hướng để di chuyển. Nhấn A để nhảy — giữ để nhảy cao hơn."],
    ["Drag the purple clay up beside the high ledge with the right stick, or stand there and hold the left trigger.", "Dùng cần phải kéo đất sét tím lên cạnh bờ cao, hoặc đứng đó và giữ cò trái."],
    ["Push the right stick down on the clay's left side.", "Đẩy cần phải xuống ở phía trái của đất sét."],
    ["Push the right stick up on the purple clay by the high ledge. It rises into a ramp.", "Đẩy cần phải lên trên đất sét tím cạnh bờ cao. Nó sẽ tạo thành đường dốc."],
    ["Stomp the porous clay away: press B in the air. Then fix the gap with the purple block.", "Dậm vỡ đất sét xốp: nhấn B khi đang trên không. Sau đó dùng khối tím lấp khoảng trống."],
    ["Level", "Màn"], ["Complete!", "Hoàn thành!"], ["Next Chapter", "Phong cảnh tiếp theo"],
    ["New best!", "Kỷ lục mới!"], ["Secret flowers", "Hoa bí mật"], ["Clay beads", "Hạt đất sét"],
    ["Your time", "Thời gian của bạn"], ["Your chapter results", "Kết quả phong cảnh"],
    ["Continue your adventure", "Tiếp tục cuộc phiêu lưu"],
    ["Email me when new chapters land", "Báo cho tôi khi có phong cảnh mới"],
    ["That’s the demo. Thanks for playing!", "Đây là bản chơi thử. Cảm ơn bạn đã chơi!"],
    ["Nice one.", "Tuyệt lắm."], ["More clay coming soon.", "Sắp có thêm thế giới mới."],
    ["That’s the demo.", "Đây là bản chơi thử."], ["Thanks for playing!", "Cảm ơn bạn đã chơi!"],
    ["Nice", "Tuyệt"], ["one.", "lắm."], ["More clay", "Thêm thế giới"], ["coming soon.", "sắp ra mắt."],
    ["Drag the purple clay up with your mouse, or hold ‹E› + ‹↑› there.", "Kéo đất sét tím lên bằng chuột, hoặc đứng gần đó rồi giữ ‹E› + ‹↑›."],
    ["Drag the clay's left side down with your mouse, or hold ‹E› + ‹↓›.", "Kéo phía trái của đất sét xuống bằng chuột, hoặc giữ ‹E› + ‹↓›."],
    ["Raise it by the ledge", "Nâng nó cạnh bờ cao"],
    ["Drag the clay up right beside the high ledge, then jump onto the ramp before it slumps.", "Kéo đất sét lên sát bờ cao, sau đó nhảy lên dốc trước khi nó xẹp xuống."],
    ["Roll the boulder", "Lăn tảng đá"],
    ["Drag the purple clay up under the boulder with your mouse until it rolls off the edge.", "Kéo đất sét tím lên dưới tảng đá cho đến khi nó lăn khỏi mép."],
    ["Raise the ground", "Nâng mặt đất"], ["Drag the purple clay up under the boulder with your mouse.", "Kéo đất sét tím lên bên dưới tảng đá."],
    ["Shape it with your mouse, or stomp it (S or ↓ in the air).", "Tạo hình bằng chuột, hoặc dậm xuống bằng S hay ↓ khi đang trên không."],
    ["Mend the corner", "Sửa góc bị vỡ"],
    ["Stomp the porous clay away: ‹S› or ‹↓› in the air. Then fix the gap with the purple block.", "Dậm vỡ đất sét xốp bằng ‹S› hoặc ‹↓› khi đang trên không, rồi dùng khối tím lấp khoảng trống."],
    ["Drag the violet clay up into the pale steps with your mouse, or hold E on it.", "Kéo đất sét tím lên theo những bậc sáng màu, hoặc đứng trên đó và giữ E."],
    ["Build it by the sill", "Tạo hình cạnh bậc cửa"],
    ["Pull the clay up beside the sill until it meets the pale steps, then hop up.", "Kéo đất sét lên cạnh bậc cửa cho tới khi chạm các bậc sáng màu, rồi nhảy lên."],
    ["Mend the stair", "Sửa cầu thang"], ["Drag the purple clay up into the pale steps.", "Kéo đất sét tím lên theo những bậc sáng màu."],
    ["Repair the gear", "Sửa bánh răng"], ["Push the purple block from the ledge above onto the broken gear.", "Đẩy khối tím từ bệ phía trên xuống bánh răng bị hỏng."],
    ["Clay teeth", "Răng đất sét"], ["Drag a tooth out of the clay ring with your mouse.", "Dùng chuột kéo một chiếc răng ra khỏi vòng đất sét."],
    ["Stand on the beam's right end until the lift locks high.", "Đứng ở đầu phải thanh ngang cho tới khi thang nâng khóa ở vị trí cao."],
    ["Press the floor down under the doorway and crawl through.", "Ấn nền xuống dưới khung cửa rồi bò qua."],
    ["The winding wheel", "Bánh xe lên dây"],
    ["Press a seat into its clay: your hand holds the wheel still. Let go, step in, ride it up.", "Ấn một chỗ ngồi vào đất sét; bàn tay sẽ giữ bánh xe đứng yên. Thả ra, bước vào và đi lên."],
    ["The timing wheel", "Bánh xe nhịp điệu"],
    ["Its roller lifts the car. Pull a bump into the clay under it and ride the bump up.", "Con lăn nâng xe lên. Kéo một ụ đất sét bên dưới rồi đứng trên ụ để đi lên."],
    ["Pinch teeth into the clay: each one turns the cog a notch and winds the car up. Too few, and it slips back.", "Nặn răng trên đất sét; mỗi răng xoay bánh răng một nấc và kéo xe lên. Quá ít răng thì xe sẽ trượt xuống."],
    ["The mainspring", "Lò xo chính"], ["Clay has jammed the ratchet. Press it down out of the slot.", "Đất sét đang kẹt bánh cóc. Hãy ấn nó ra khỏi rãnh."],
    ["The lid is closing", "Nắp đang khép lại"], ["Shape the ribbon into a way up to the lip. Hurry.", "Tạo dải đất sét thành đường lên mép. Nhanh lên!"],
    ["Jump onto the pink — it throws you back up, higher than you jumped.", "Nhảy lên phần màu hồng — nó sẽ bật bạn lên cao hơn cú nhảy ban đầu."],
    ["Drag the pink up into a mound, or stand on it and hold E. Deeper clay throws higher.", "Kéo phần màu hồng thành một gò cao, hoặc đứng trên đó và giữ E. Đất sét càng dày sẽ bật càng cao."],
    ["It carries what rests on it", "Nó nâng mọi vật nằm trên mình"],
    ["The fallen trunk has someone under it. Push the purple block in under its raised end, then shape the clay.", "Có người mắc kẹt dưới thân cây đổ. Đẩy khối tím vào dưới đầu đang nâng, rồi tạo hình đất sét."],
    ["Jump, then stomp the spore ball. Ride the rising spores out of the hollow.", "Nhảy rồi dậm lên quả bào tử. Đi theo luồng bào tử bay lên để thoát khỏi hang."],
    ["The breath has gone out of this bough", "Cành cây này đã mất hơi thở"],
    ["Raise the violet clay under it: drag it up, or stand on it and hold E.", "Nâng đất sét tím bên dưới: kéo nó lên, hoặc đứng trên đó và giữ E."],
    ["Stuck? Raise a sail", "Bị kẹt? Hãy dựng cánh buồm"],
    ["Catch the wind", "Đón gió"],
    ["Push the purple block onto the raft and raise it into a sail — drag it up, or stand on it and hold E. Taller sails go faster.", "Đẩy khối tím lên bè rồi nâng nó thành cánh buồm — kéo lên hoặc đứng trên đó và giữ E. Buồm càng cao, bè đi càng nhanh."],
    ["Clay brace", "Trụ chống đất sét"],
    ["Stand by the violet clay and hold E: it grows into a brace and lifts the fallen stone back up.", "Đứng cạnh đất sét tím và giữ E: nó sẽ lớn thành trụ chống, nâng phiến đá đổ trở lại."],
    ["Stabilize, don’t destroy", "Giữ vững, đừng phá hủy"],
    ["Stomp the corruption on Atlas to ease him. A stone shaken from the slab cracks before it falls.", "Dậm lên phần tha hóa trên Atlas để giúp ông. Đá bị rung khỏi phiến sẽ nứt trước khi rơi."],
    ["Drag the violet clay back along the crane’s tail, or stand on it and hold E. The further back it lies, the higher the hook lifts.", "Kéo đất sét tím về sau dọc theo đuôi cần cẩu, hoặc đứng trên đó và giữ E. Càng lùi xa, móc cẩu càng nâng cao."],
    ["Drag the purple clay up under the slab with your mouse.", "Dùng chuột kéo đất sét tím lên dưới phiến đá."],
    ["Drag the purple clay up under the slab's free end to lift it.", "Kéo đất sét tím lên dưới đầu tự do của phiến đá để nâng nó."],
    ["The egg rolls on the ground you shape", "Quả trứng lăn trên con đường bạn tạo"],
    ["Drag the violet turf up under the egg. Eggs stop in hollows: drag the cup’s rim in to send it on.", "Kéo nền tím lên dưới quả trứng. Trứng sẽ dừng trong chỗ lõm; kéo mép hố vào trong để nó tiếp tục lăn."],
  ];

  translations.push(
    ["Boulders", "Tảng đá"], ["Pebbles", "Đá cuội"], ["Rock shelf", "Bệ đá"],
    ["Clay pot", "Bình đất sét"], ["Torch", "Đuốc"], ["Clay tree", "Cây đất sét"],
    ["Cloud", "Mây"], ["Water", "Nước"], ["Giant hand", "Bàn tay khổng lồ"],
    ["Back wall", "Tường sau"], ["Cactus", "Xương rồng"], ["Rock arch", "Vòm đá"],
    ["Purple arch", "Vòm tím"], ["Summit", "Đỉnh núi"], ["Camp tent", "Lều trại"],
    ["Cave mouth", "Cửa hang"], ["Cave gate", "Cổng hang"], ["Cave gate (inside)", "Cổng hang (phía trong)"],
    ["Windmill", "Cối xay gió"], ["Mushroom", "Nấm"], ["Tall mushroom", "Nấm cao"],
    ["Flowering leaves", "Lá có hoa"], ["Leaf tuft", "Bụi lá"], ["Tree crown", "Tán cây"],
    ["Grove island", "Đảo rừng"], ["Wooded hills", "Đồi cây"], ["Cliff falls", "Thác vách đá"],
    ["Waterfall gorge", "Hẻm thác nước"], ["Lungwood", "Cây phổi"], ["Hollow tree", "Cây rỗng"],
    ["Great trunk", "Thân cây lớn"], ["Root wall", "Tường rễ"], ["Gill trunk", "Thân nấm"],
    ["Far tree", "Cây phía xa"], ["Bracket shelf", "Bệ nấm"], ["Crystal cluster", "Cụm pha lê"],
    ["Amber mushrooms", "Nấm hổ phách"], ["Hanging moss", "Rêu treo"], ["Rock furnace", "Lò đá"],
    ["Furnace vent", "Ống thông lò"], ["Smoking flue", "Ống khói"], ["Kiln pots", "Bình lò nung"],
    ["Potters’ banner", "Cờ thợ gốm"], ["Pipe run", "Đường ống"], ["Pipe bend", "Ống cong"],
    ["Pipe hoop", "Vòng ống"], ["Valve wheel", "Bánh van"], ["Caged lamp", "Đèn lồng"],
    ["Timber bracing", "Khung gỗ"], ["Canopy mushroom", "Nấm tán"], ["Mushroom colony", "Cụm nấm"],
    ["Tiny mushrooms", "Nấm nhỏ"], ["Grotto rock", "Đá hang"], ["Crystal island", "Đảo pha lê"],
    ["Cottage", "Nhà nhỏ"], ["Laundry line", "Dây phơi"], ["Doorway", "Khung cửa"],
    ["Cloudtop castle", "Lâu đài trên mây"], ["Cavern wall", "Tường hang"],
    ["Ceiling tooth · vermilion", "Răng trần · đỏ son"], ["Ceiling tooth · red", "Răng trần · đỏ"],
    ["Ceiling tooth · pink", "Răng trần · hồng"], ["Windmill wheel", "Bánh cối xay"],
    ["Counterweight frame", "Khung đối trọng"], ["Pulse drum", "Trống nhịp"], ["Beacon", "Đèn hiệu"],
    ["Stone arch", "Vòm đá"], ["Root arch", "Vòm rễ"], ["Banner arch", "Vòm cờ"],
    ["Bell gate", "Cổng chuông"], ["Kiln", "Lò nung"], ["Crystal spikes", "Gai pha lê"],
    ["Clay mushroom", "Nấm đất sét"], ["Spore pod", "Túi bào tử"],
    ["Riverbed & ropeway", "Lòng sông & cáp treo"], ["Wet clay", "Đất sét ướt"],
    ["Drag the clay up with your mouse, or hold ‹E› + ‹↑› there.", "Kéo đất sét lên bằng chuột hoặc giữ ‹E› + ‹↑› tại đó."],
    ["The Boulder Drop", "Dốc Đá Lăn"], ["Drop the boulder", "Thả tảng đá"],
    ["Wake the heart of the mountain", "Đánh thức trái tim ngọn núi"], ["The Kiln", "Lò Nung"],
    ["The Clay Spill", "Dòng Đất Sét"], ["Mend the great span", "Sửa nhịp cầu lớn"],
    ["Weights, draughts & your own hands", "Đối trọng, luồng gió & đôi tay của bạn"],
    ["Stretch a ramp", "Kéo dài đường dốc"], ["Pull the wall over", "Kéo bức tường xuống"],
    ["Press the last bridge", "Ấn cây cầu cuối"], ["The Crooked Garden", "Khu Vườn Cong"],
    ["Slump the bulb", "Làm xẹp khối cầu"], ["The Folding Path", "Con Đường Gấp"],
    ["Roll the tongue out", "Cuộn lối đi ra"], ["Fold the path", "Gấp con đường"],
    ["The ceiling bends", "Trần nhà uốn cong"], ["The Upside-Down Orchard", "Vườn Cây Lộn Ngược"],
    ["Pull the orchard up", "Kéo vườn cây lên"], ["The Breathing Corridor", "Hành Lang Biết Thở"],
    ["Spread the plug", "Mở rộng nút chặn"], ["The Infinite Room", "Căn Phòng Vô Tận"],
    ["The Music Box", "Hộp Nhạc"], ["Ride the wheel", "Đi trên bánh xe"],
    ["Time the lift", "Canh nhịp thang nâng"], ["Wind the car", "Lên dây chiếc xe"],
    ["Free the spring", "Giải phóng lò xo"], ["Make your way up", "Tìm đường đi lên"],
    ["A half-remembered dream of warm clay", "Giấc mơ mơ hồ về đất sét ấm"],
    ["First bounce", "Cú nảy đầu tiên"], ["Pile it up", "Chất nó lên"], ["The pocket", "Chiếc túi"],
    ["The angle shot", "Cú bắn góc"], ["The drop", "Cú rơi"], ["Pinball grove", "Rừng Pinball"],
    ["Pinball grove · the second shaft", "Rừng Pinball · giếng thứ hai"], ["The leaned slab", "Phiến đá nghiêng"],
    ["The Stilled Branch", "Cành Cây Lặng Yên"], ["The stilled branch", "Cành cây lặng yên"],
    ["Throw the pod", "Ném túi bào tử"], ["The bough that sinks back", "Cành cây lún xuống"],
    ["The bridge", "Cây cầu"], ["The final run", "Chặng chạy cuối"],
    ["Bounce, shape & set free", "Nảy, tạo hình & giải phóng"], ["The slumped bough", "Cành cây xẹp"],
    ["The Stilled Heart", "Trái Tim Lặng Yên"], ["The Crosswind Canopy", "Tán Rừng Gió Ngang"],
    ["The Breath Runs Ahead", "Hơi Thở Phía Trước"], ["Raise a sail", "Dựng cánh buồm"],
    ["The plug in her crown", "Nút chặn trên tán cây"], ["Rise on the forest's breath", "Bay lên theo hơi thở khu rừng"],
    ["The forest breathes. Rise on its breath, find where it stopped, and set it breathing again.", "Khu rừng đang thở. Hãy bay theo luồng thở, tìm nơi nó dừng lại và khơi lại nhịp thở."],
    ["The Hanging Quarter at Nightfall", "Khu Phố Trên Không Lúc Chạng Vạng"],
    ["Quarter at Nightfall", "Khu Phố Chạng Vạng"], ["Every rope has two ends", "Mỗi sợi dây đều có hai đầu"],
    ["Everything here hangs, and every rope has two ends. Ring the sky bell by midnight.", "Mọi thứ nơi đây đều treo lơ lửng và mỗi sợi dây có hai đầu. Hãy rung chuông trời trước nửa đêm."],
    ["The Evening Bells", "Chuông Chiều"], ["Washing Lines", "Những Dây Phơi"],
    ["The Swinging Signs", "Biển Hiệu Đung Đưa"], ["The Counterweight", "Đối Trọng"],
    ["Lead and Lanterns", "Chì & Đèn Lồng"], ["Sculpt the counterweight", "Tạo hình đối trọng"],
    ["The Long Descent", "Đường Xuống Dài"], ["Atlas", "Atlas"],
    ["The Marble Quarry at Nightfall", "Mỏ Đá Cẩm Thạch Lúc Chạng Vạng"],
    ["Every rope has two ends, carved in marble", "Mỗi sợi dây có hai đầu, được khắc trong cẩm thạch"],
    ["A story test: the camp, the slab, the stranger", "Câu chuyện: trại, phiến đá và người lạ"],
    ["Out camping in the canyon. Something is not right up the wall.", "Một chuyến cắm trại trong hẻm núi. Có điều bất thường phía trên vách."],
    ["The fallen slab", "Phiến Đá Đổ"], ["The Millrace", "Kênh Cối Xay"],
    ["The waterwheel", "Bánh xe nước"], ["The Wheelwright's Mill", "Xưởng Cối Xay"],
    ["Wheelwright’s Mill", "Xưởng Cối Xay"], ["Every machine runs on a ring of clay", "Mọi cỗ máy vận hành bằng vòng đất sét"],
  );

  const characterNames = {
    vi: {
      clay: ["Doraemon", "Mèo máy xanh · nhân vật mặc định của Run FPL."],
      explorer: ["Nhà thám hiểm FPL", "Nhà thám hiểm chính của Run FPL."],
      emberleaf: ["Kiếm sĩ Lửa", "Kiếm khách anime mang sắc lửa và kem."],
      "clay-wanderer": ["Lữ khách Sakura", "Lữ khách anime mang sắc hồng và đá."],
      "garden-helper": ["Hộ vệ Rừng", "Hộ vệ khu rừng xanh và đất nung."],
      apprentice: ["Pháp sư Bầu trời", "Pháp sư học việc của bầu trời."],
    },
    en: {
      clay: ["Doraemon", "Blue robot cat · the default Run FPL character."],
      explorer: ["FPL Explorer", "Run FPL's main explorer."],
      emberleaf: ["Flame Ronin", "An anime swordsman in flame and cream."],
      "clay-wanderer": ["Sakura Wanderer", "An anime wanderer in sakura and stone."],
      "garden-helper": ["Forest Guardian", "Guardian of the green clay forest."],
      apprentice: ["Sky Apprentice", "An apprentice mage of the open sky."],
    },
  };

  const readLanguage = () => localStorage.getItem(languageKey) === "en" ? "en" : "vi";

  function translateText(value, language) {
    if (!value || !value.trim()) return value;
    const start = value.match(/^\s*/)?.[0] || "";
    const end = value.match(/\s*$/)?.[0] || "";
    const clean = value.trim();
    for (const [en, vi] of translations) {
      if (clean === en || clean === vi) return `${start}${language === "vi" ? vi : en}${end}`;
    }
    let match = clean.match(/^(\d+) passages(?: · Checkpoint saved| · Đã lưu điểm)?$/);
    if (match) return `${start}${match[1]} ${language === "vi" ? "chặng" : "passages"}${end}`;
    match = clean.match(/^(\d+) per cent$|^(\d+) phần trăm$/);
    if (match) return `${start}${match[1] || match[2]} ${language === "vi" ? "phần trăm" : "per cent"}${end}`;
    match = clean.match(/^(\d+) health remaining$|^Còn (\d+) máu$/);
    if (match) return `${start}${language === "vi" ? `Còn ${match[1] || match[2]} máu` : `${match[1] || match[2]} health remaining`}${end}`;
    match = clean.match(/^(\d+) of (\d+) secret flowers found$|^Đã tìm (\d+) trên (\d+) hoa bí mật$/);
    if (match) {
      const found = match[1] || match[3];
      const total = match[2] || match[4];
      return `${start}${language === "vi" ? `Đã tìm ${found} trên ${total} hoa bí mật` : `${found} of ${total} secret flowers found`}${end}`;
    }
    match = clean.match(/^Loading the (.+) · (\d+)%$|^Đang tải (.+) · (\d+)%$/);
    if (match) {
      const place = match[1] || match[3];
      const percent = match[2] || match[4];
      const places = { woodland: "khu rừng", canyon: "hẻm núi", caverns: "hang động", quarter: "phố treo", dream: "giấc mơ", quarry: "mỏ đá" };
      return `${start}${language === "vi" ? `Đang tải ${places[place] || place} · ${percent}%` : `Loading the ${Object.keys(places).find((key) => places[key] === place) || place} · ${percent}%`}${end}`;
    }
    match = clean.match(/^Shaping the (.+)…$|^Đang tạo hình (.+)…$/);
    if (match) {
      const place = match[1] || match[2];
      const places = { woodland: "khu rừng", canyon: "hẻm núi", caverns: "hang động", quarter: "phố treo", dream: "giấc mơ", quarry: "mỏ đá" };
      return `${start}${language === "vi" ? `Đang tạo hình ${places[place] || place}…` : `Shaping the ${Object.keys(places).find((key) => places[key] === place) || place}…`}${end}`;
    }
    return value;
  }

  function applyTranslations(root, language) {
    document.documentElement.lang = language;
    const scope = root.nodeType === Node.ELEMENT_NODE || root.nodeType === Node.DOCUMENT_NODE ? root : root.parentElement;
    if (!scope) return;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.parentElement?.closest("script,style")) continue;
      const next = translateText(node.nodeValue, language);
      if (next !== node.nodeValue) node.nodeValue = next;
    }
    const elements = scope.querySelectorAll?.("[aria-label],[title],[placeholder]") || [];
    for (const element of elements) {
      for (const attribute of ["aria-label", "title", "placeholder"]) {
        if (!element.hasAttribute(attribute)) continue;
        const value = element.getAttribute(attribute);
        const next = translateText(value, language);
        if (next !== value) element.setAttribute(attribute, next);
      }
    }
  }

  function ensureLanguageControl(language) {
    const settings = document.querySelector("#dialog-content .title-settings");
    if (!settings) return;
    const existing = settings.querySelector("[data-run-fpl-language]");
    if (existing) {
      existing.setAttribute("aria-label", language === "vi" ? "Ngôn ngữ" : "Language");
      existing.querySelector("span:not(.language-mark)").textContent = language === "vi" ? "Ngôn ngữ" : "Language";
      existing.querySelector("strong").textContent = language === "vi" ? "VI" : "EN";
      return;
    }
    settings.insertAdjacentHTML("beforeend", `<button class="title-setting run-fpl-language" data-run-fpl-language type="button" aria-label="Language"><span class="language-mark">文</span><span>${language === "vi" ? "Ngôn ngữ" : "Language"}</span><strong>${language === "vi" ? "VI" : "EN"}</strong></button>`);
  }

  function ensureWorldPicker(language) {
    const menu = document.getElementById("menu");
    if (!menu || document.getElementById("run-fpl-world-picker")) return;
    const labels = worlds.map(([level, emoji, vi, en]) => `<button type="button" data-run-fpl-level="${level}" title="${language === "vi" ? `Chơi cảnh ${vi}` : `Play ${en}`}" aria-label="${language === "vi" ? `Chơi cảnh ${vi}` : `Play ${en}`}"><span>${emoji}</span><small>${language === "vi" ? vi : en}</small></button>`).join("");
    menu.insertAdjacentHTML("beforeend", `<section id="run-fpl-world-picker" class="run-fpl-world-picker"><header><strong>${language === "vi" ? "ĐỔI PHONG CẢNH" : "CHANGE SCENERY"}</strong><small>${language === "vi" ? "Bấm một cảnh để vào chơi ngay" : "Pick a world and play instantly"}</small></header><div>${labels}</div></section>`);
  }

  function applyBrand() {
    const language = readLanguage();
    document.title = language === "vi" ? "Run FPL — Thế giới Anime" : "Run FPL — Anime Worlds";

    document.querySelectorAll(".title-logo").forEach((image) => {
      image.alt = "Run FPL";
    });

    const tagline = document.getElementById("title-tagline");
    const taglineText = language === "vi" ? "THẾ GIỚI ANIME" : "ANIME WORLDS";
    if (tagline && tagline.textContent !== taglineText) tagline.textContent = taglineText;

    const worldsButton = document.querySelector("#chapters span");
    const worldsText = language === "vi" ? "Phong cảnh" : "Worlds";
    if (worldsButton && worldsButton.textContent !== worldsText) worldsButton.textContent = worldsText;

    const social = document.getElementById("title-social-links");
    const hasRunFplLinks = (container) => {
      const hrefs = [...container.querySelectorAll(":scope > a")].map((link) => link.getAttribute("href") || "");
      return hrefs.length === 3 && hrefs.some((href) => href.includes("facebook.com/le.nhat.492484")) && hrefs.some((href) => href.includes("github.com/minhnhatdepzai")) && hrefs.some((href) => href.startsWith("mailto:lnhat1938@gmail.com"));
    };
    if (social && !hasRunFplLinks(social)) {
      social.dataset.owner = "run-fpl-v2";
      social.innerHTML = socialMarkup;
    }

    document.querySelectorAll(".completion-social").forEach((completionSocial) => {
      if (hasRunFplLinks(completionSocial)) return;
      completionSocial.dataset.owner = "run-fpl-v2";
      completionSocial.innerHTML = socialMarkup;
    });

    const profileButton = document.getElementById("title-updates");
    if (profileButton && profileButton.dataset.owner !== "run-fpl") {
      profileButton.dataset.owner = "run-fpl";
      profileButton.title = "Portfolio của Lê Minh Nhật";
      profileButton.setAttribute("aria-label", "Mở portfolio của Lê Minh Nhật");
      profileButton.querySelector("span").textContent = "Lê Minh Nhật";
    }

    for (const [id, [name, note]] of Object.entries(characterNames[language])) {
      const button = document.querySelector(`[data-character="${id}"]`);
      if (!button) continue;
      const strong = button.querySelector("strong");
      const small = button.querySelector("small");
      if (strong && strong.textContent !== name) strong.textContent = name;
      if (small && small.textContent !== note) small.textContent = note;
    }

    const characterLabel = document.querySelector(".title-characters-label span");
    const characterText = language === "vi" ? "Nhân vật anime" : "Anime character";
    if (characterLabel && characterLabel.textContent !== characterText) {
      characterLabel.textContent = characterText;
    }

    const chapterHeading = document.querySelector(".chapters-list")?.previousElementSibling;
    const chapterText = language === "vi" ? "Chọn phong cảnh của bạn." : "Choose your world.";
    if (chapterHeading?.tagName === "H2" && chapterHeading.textContent !== chapterText) {
      chapterHeading.textContent = chapterText;
    }

    ensureLanguageControl(language);
    ensureWorldPicker(language);
    const privacyNote = document.querySelector("#dialog-content .title-settings + p");
    if (privacyNote) {
      privacyNote.textContent = language === "vi"
        ? "Âm thanh, ngôn ngữ và toàn bộ tiến trình chỉ được lưu trên thiết bị này. Run FPL không gửi dữ liệu chơi lên máy chủ."
        : "Sound, language and all progress are stored only on this device. Run FPL does not send gameplay data to a server.";
    }
    applyTranslations(document, language);
  }

  document.addEventListener(
    "click",
    (event) => {
      const languageButton = event.target.closest("[data-run-fpl-language]");
      if (languageButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const nextLanguage = readLanguage() === "vi" ? "en" : "vi";
        localStorage.setItem(languageKey, nextLanguage);
        document.getElementById("run-fpl-world-picker")?.remove();
        applyBrand();
        return;
      }

      const worldButton = event.target.closest("[data-run-fpl-level]");
      if (worldButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const level = worldButton.dataset.runFplLevel;
        document.getElementById("chapters")?.click();
        requestAnimationFrame(() => document.querySelector(`.chapter-choice[data-level="${level}"]`)?.click());
        return;
      }

      if (!event.target.closest("#title-updates")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      window.open("https://leminhnhat-portfolio.lnhat1938.workers.dev/", "_blank", "noopener,noreferrer");
    },
    true,
  );

  const start = () => {
    applyBrand();
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        applyBrand();
      });
    }).observe(document.body, { childList: true, subtree: true });

    for (const id of ["loading-status", "intro-name", "hint-title", "hint-text", "toast", "timer-label"]) {
      const element = document.getElementById(id);
      if (!element) continue;
      new MutationObserver(() => applyTranslations(element, readLanguage())).observe(element, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
