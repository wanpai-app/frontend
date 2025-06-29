# WanPai 玩派 - 前端專案

## 簡介

本專案為「WanPai 玩派」模型電商網站的前端程式碼庫。採用 Vue 3、Tailwind CSS 及 PrimeVue 技術，透過 Vite 架設開發環境，並串接基於 Express 的 RESTful API。功能涵蓋商品瀏覽、搜尋、購物流程與後台管理系統，提供完整的使用與管理體驗。

## 安裝步驟

1. Clone 此 Repository

```bash
 git clone https://github.com/wanpai-app/frontend.git
 cd frontend
```

2. 安裝 npm 相關套件

```bash
 npm install
```

3. 設定環境變數
   建立 `.env` 檔案，並依照 `.env.production` 或下方格式填入必要變數：

```
VITE_API_BASE_URL=https://your-real-api.com/api
```

4. 啟動開發伺服器

```bash
 npm run dev
```

## 技術使用

本專案使用了以下技術和工具：

- Vue 3 + Vite
- Tailwind CSS
- PrimeVue

## 團隊成員

- 彭芷儀 [GitHub](https://github.com/yura813)
  - 新增編輯商品功能
  - 後台訂單管理
  - 資料庫架構設計
- 張馨云 [GitHub](https://github.com/kirua05)
  - Python 爬蟲清理商品資料，匯入至 PostgreSQL 資料庫
  - 單一商品頁面
  - AWS S3 雲端資料庫連接
- 林欣雨 [GitHub](https://github.com/Raelin930)
  - 訂單管理頁面實作
  - 訂單 API
  - 資料庫
- 巫坤郁 [GitHub](https://github.com/kenyykd)
  - 串接綠界金流
  - 購物車詳細資料切版
  - 商品標籤
- 謝聿涵 [GitHub](https://github.com/hsiehyuhan)
  - 串接購物車
  - 資料庫
  - 登入使用者處理購物車資料方式
- 侯建男 [GitHub](https://github.com/Nannn1997)
  - 網站首頁切版
  - 商品資料串接
  - 搜尋商品功能
- 楊子毅 [GitHub](https://github.com/ziyi1998)
  - 登入註冊功能
  - 會員編輯資料功能
  - 資料庫
- 吳禹慧 [GitHub](https://github.com/rosewuuu)
  - 通知頁面
  - 資料庫
  - 技術簡報製作

## 其他

本專案為課程小組專案，僅供學術用途。
