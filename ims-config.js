/* Asung IMS 공통 설정
   ─────────────────────────────────────────────
   anon key는 "공개용(publishable)" 키입니다. 클라이언트 코드에 넣어도 안전하며,
   실제 데이터 보호는 Supabase RLS(행 수준 보안)가 담당합니다.
   ⚠️ service_role 키는 절대 여기 넣지 마십시오. 이 레포는 공개입니다.

   프로젝트: Asung-IMS (fazgmyvzzhqybtvtktyg · ca-central-1)
   ⚠️ 운영 WMS(asung-WMS · gftpcnkxbdjzzfvzwcfl)와 다른 프로젝트입니다 — 세션이 공유되지 않습니다.
*/
window.IMS_CONFIG = {
  SUPABASE_URL: "https://fazgmyvzzhqybtvtktyg.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhemdteXZ6emhxeWJ0dnRrdHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NzE4NzQsImV4cCI6MjEwNDQ0Nzg3NH0.QMOp61UoSHj8eu8H5ZrB2L1-iclN92WmvrcKUExE8xM"
};
