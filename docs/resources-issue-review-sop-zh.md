# 调色板资源议题审核与处置 SOP（中文）

## 适用范围

本流程用于审核 `railmapgen/rmg-palette` 中新增或更新城市调色板的资源议题，包括线路颜色、前景色、名称、译名及城市信息的变更。

投稿标题通常为 `Resources: New palettes of <city>`。新建和更新使用同一标题格式，应以正文中的城市 ID 和主线数据判断实际操作。

## 执行原则

- 同一城市的未关闭投稿组成一个队列。同一作者只保留最新投稿，较早投稿按重复关闭；其余投稿从旧到新审核。
- 每项新增或修改都必须有可复核的依据，并保留其他已有数据及既有线路 ID。
- 不通过的议题统一关闭，补充资料或修改后必须新开议题，并引用原议题编号。
- 只有审核通过且 PR 已实际合并的议题，才按完成处理；其他关闭一律使用 `not planned`。
- 每个议题先形成审核结论、回复正文及具体 `gh` 命令，再向人工汇报，按明确获准的范围执行。已有授权覆盖当前操作时不重复请求许可。
- 面向人工的汇报使用中文。面向投稿者的回复使用对应城市或地区的官方语言；有多种官方语言时，选择当地最主要或使用人数最多的一种。

## 第 1 步：读取投稿并确定城市

1. 读取 issue 的标题、正文、作者、创建时间、标签、状态和全部评论。
2. 从 `details[repo="rmg-palette"][type="city"]` 中的 JSON 读取 `id`、`country` 和 `name`，将城市 ID 归一化为小写。
3. 在 `main` 的 `public/resources/city-config.json` 中查找该 ID，确认是新增城市还是更新既有城市，并核对所属国家或地区。
4. 若标题和结构化数据不一致，以结构化数据确定审核对象，同时记录需修正的标题或元数据问题。
5. 若缺少或无法解析城市数据，结合现有 PR 的资源路径辅助定位；仍无法确定时，按 `invalid format` 处理，不猜测城市。
6. 已关闭的投稿不自动重开；仅在人工明确要求复核时重新检查。

后续审核必须核对以下投稿内容：

- `Data source`：申报的数据来源类别。
- `Reference link`：能支持本次修改的资料链接。
- `Justification`：本次修改的具体内容和理由。
- 固定提示 `Do not edit lines below, they are meant for bots only!!!`，且正文不得残留 `REPLACE ME`。
- `type="city"` 的城市对象和 `type="lines"` 的完整线路数组；新建国家或地区时还需 `type="country"` 对象。
- 数据块中的 JSON 必须有效，顺序为可选的 country、city、lines。

## 第 2 步：建立队列并关闭同作者的较早投稿

1. 查找同一城市所有未关闭的资源 issue，逐条核对正文城市 ID。不要只依赖英文标题，也不要将 PR 混入队列。
2. 按作者分组。同一作者有多个同城市投稿时，仅保留创建时间最新的那个；时间相同时，保留编号最大的那个。
3. 较早投稿直接标记为 `duplicate`，回复中指向该作者最新的投稿。无须先比较内容，也不因较早稿包含独有内容而保留它。
4. 准备关闭较早 issue、关闭其未合并的 PR、删除对应 bot 分支的命令，汇报并取得许可后执行。
5. 最新投稿之后被拒绝时，不恢复该作者已按重复关闭的旧投稿。
6. 将剩余投稿按创建时间从旧到新排序；时间相同时按编号从小到大排序，逐个处理。

不同作者的投稿不能仅凭城市相同就按重复关闭。需核对实际增量，确认已被主线或已合入投稿完全覆盖后，才能按 `better version exists` 处理。

## 第 3 步：检查 PR、分支和审核基线

1. 查找 `bot-<issue_number>` 分支及其指向 `main` 的 PR，核对 PR 正文关联的 issue。同分支有多个历史 PR 时，使用当前打开的 PR，不操作历史已合并的 PR。
2. 记录当前 `main` 和 PR head 的提交 SHA，读取实际文件及 diff。PR 正文中的颜色摘要不能代替文件内容。
3. 检查 PR 中的城市色板、`city-config.json`、`country-config.json` 是否包含本次声明的修改。
4. 若未生成 PR，检查 issuebot 日志及投稿格式。格式错误按 `invalid format`；权限、网络或构建环境故障按技术阻塞处理。
5. 检查 PR 的资源测试、资源构建、应用 lint 和测试。尚未结束则等待；失败则先确定原因，不能仅凭 bot 创建成功就判为通过。

必须核对以下两种写入结果：

- `lines` 会整份写入 `public/resources/palettes/<cityID>.json`。必须检查是否漏掉、删除或回退主线已有条目。
- bot 不会覆盖已有同 ID 的城市或国家配置。若投稿声明修改这些信息而 PR 未体现，应向人工报告产物问题，修正并重新审核后才能合并。

### 需要重建 bot 产物时

出现以下情况时，先检查是否需要重建：

- 该 PR 生成后，同城市其他投稿已经合入 `main`，当前分支仍基于旧数据。
- 共享城市或国家配置产生冲突，或当前 bot 产物与 issue 正文不一致。
- 投稿格式正确，但旧 bot 分支或 PR 阻碍了重新生成。

执行顺序：

1. 保存当前 issue 正文，确认本次要重建的 PR 和分支。
2. 列出关闭旧 PR、删除旧分支、编辑 issue 触发重建的命令，取得相应许可。
3. 关闭旧的未合并 PR，删除对应 bot 分支，保留 issue 为打开状态。
4. 在完整保留投稿正文的基础上追加一条重触发注释，再编辑 issue。只发表评论或重开 issue 不会触发 issuebot。
5. 等待对应 issuebot 运行结束，重新查找 PR、分支和 head SHA。
6. 重新比较最新主线与投稿的完整线路数组，再执行后续审核。

重建不会自动保留旧投稿中遗漏的新数据。如果投稿会删除或回退已合入内容，按 `need fixing` 拒绝，要求基于最新调色板重新提交。较早议题被拒绝而未合入主线时，不因此重建后续投稿。

## 第 4 步：收集并核实来源

对本次每一条新增、改色、改名或删除的线路，记录实际来源、材料日期和可定位的位置。改色时还需查明主线现值的来源，可通过文件提交记录、原 PR 和 issue 回溯。

来源应能直接定位到色值或名称，例如设计标准的页码、PDF 中的线路、官网元素、Wikipedia 的 Template 或 Module、原始图片中的取色区域。只有网站首页或笼统说明时，应先尝试定位投稿所指的具体材料；仍找不到则按依据不足处理。

### 来源优先级

按以下顺序判断来源，编号越小优先级越高：

| 等级 | 来源 | 核实要求 |
| --- | --- | --- |
| 1 | 官方网站发布的设计标准 | 明确给出线路的 RGB、HEX、Pantone 等标准值 |
| 2 | 官方社交媒体发布的设计标准 | 确认官方账号及明确标准值 |
| 3 | 政府或立法机关公布的设计守则 | 确认文件真实、适用且仍然有效 |
| 4 | 可信内部资料 | 能核实官方出处及具体色值，材料必须可供审核 |
| 5 | 官方网站源码 | 直接读取对应线路的 HTML、CSS 或 SVG 颜色 |
| 6 | 官方 PDF | 从原始文件提取对应线路颜色 |
| 7 | 官方图片 | 原图足够清晰，能稳定复现取色结果 |
| 8 | 维基百科 | 核对实际颜色模板、模块或原始矢量资源，排除未知颜色的默认值和无依据的个人制图 |
| 9 | 其他来源 | 仅在官方和维基百科资料均不可用时，说明可信依据并交人工确认 |

同时执行以下规则：

- 根据资料内容和取色方法判断类别。官网或官方公众号里的普通线路图不属于精确设计标准。
- 修改现有颜色时，采用优先级相等或更高且仍适用的来源。若旧标准已被后续官方资料替代，明确记录替代依据，不继续套用失效标准。
- 原值来源无法查明时，在汇报中说明，由人工核对新依据是否足以支持变更；不得凭印象给原值指定来源等级。
- 不接受百度百科、快懂百科、360 百科、地铁通、普通爱好者制图或 AI 生成结果直接作为颜色依据。其他第三方材料不能仅凭“接近官方”获得认可。
- 社交媒体材料需确认发布者身份及原始出处；不得将非官方作者作品当作官方资料。
- 工程图、环评图、车辆涂装或实物照片本身不足以证明正式线路标志色；只有能够核实为适用的线路颜色依据时才继续审核。
- 仅给出“青竹色”等文字色名、线路开通消息或规划批复，而没有明确数值或可提取颜色，不能支持新增或改色。
- 来源必须覆盖本次所有新增或修改；不能用一条线路的资料证明其余线路。
- 只修改名称或译名时，核实名称依据，不强制应用颜色来源等级限制。

来源已确认失效、内容不足、类别填错或不能核实出处时，按 `invalid references` 拒绝，说明缺少的具体依据，要求补充后新开议题。不保留原议题等待补证。

若只是审核环境临时无法联网，尚不能确认来源是否失效，应停止当前审核并报告技术阻塞，不将环境故障写成投稿错误。

## 第 5 步：逐项审核投稿

先确定本次修改范围，再核对全部实际增量。填写以下对比表；原有未改动条目需确认完整保留，不要求投稿者重新提供其全部历史来源。

| 线路 ID | 修改项目 | 主线值 | 提交值 | 来源值及位置 | 结论 |
| --- | --- | --- | --- | --- | --- |
| 对应 ID | 新增、背景色、前景色、名称或删除 | 旧值或不存在 | 新值 | 可直接复核的值及位置 | 通过或具体问题 |

### 颜色和取色方法

- 来源明确给出 RGB 或 HEX 时，提交值必须一致，不能以肉眼接近替代数值核对。
- 背景色使用六位十六进制格式 `#RRGGBB`；前景色只能为 `#000` 或 `#fff`，省略前景色表示白色。
- 检查文字黑白色是否与适用来源一致。官方资料冲突时，不能仅按个人对比度偏好修改。
- 优先读取原始源码、矢量文件或 PDF，避免从网页压缩预览或截图再次取色。
- 图片取色需注明原图、位置和色彩空间。低清、抗锯齿边缘、半透明线条或背景混色导致结果不能稳定复核时，不予通过。
- 使用 Pantone 时，同时检查色号与对应的网页 RGB 或 HEX。变更其中之一时，不能留下不一致的另一项。
- 只有 CMYK 或不同转换结果时，必须说明转换依据；不能自行假定某个 HEX 唯一正确。
- 不自行设置统一的图片色差容忍阈值。明确数值按数值审核；无法解释的取色差异应指出并要求修正或补充依据。

### 线路完整性和兼容性

- 保留既有线路 ID。修改显示名称不能同时任意更换引用 ID。
- 新增线路必须有非空且不重复的 ID；线路名称、颜色与 ID 应一一对应。
- 新增或修改线路时，不得意外删除其他已有线路，或回退此前合入的颜色和译名。
- 已停运、合并或未开通本身不是删除理由；有可靠来源的规划线路可以收录。
- 删除已经退出规划或原本缺乏可靠依据的条目时，必须提供明确理由和证据，并在人工汇报中单列删除项。
- 本次局部更新正确且未破坏已有数据时，可以通过。不要因无关线路尚未更新而直接拒绝。
- 投稿中仍有错误或缺失依据的部分时，不直接合并整份数据。统一拒绝，由投稿者修正后新开议题。

### 城市、范围和名称

- 只收录现实世界的公共交通调色板；虚构城市、游戏系统、航空公司品牌色及其他无关内容不予通过。
- 按城市或既有地区范围归类。不得把运营商名称直接用作城市名称，也不得任意重复创建已有城市或扩大其范围。
- 国家或地区代码应与城市实际归属及仓库约定一致。英国使用项目既有的细分代码，例如威尔士为 `GBWLS`。
- 新城市、国家及新增或修改的名称应补齐英文、简体中文、繁体中文和配置所要求的官方语言；不因未修改的历史条目存在旧格式就要求整座城市重做。
- 核对线路名、拼写、译名和语言字段，不得把其他语言误填到英文名称中。
- 理由应准确描述实际修改。不得提交空内容、无关说明或与主线完全相同的数据。
- 单纯重复现有数据或有效修改已被主线完整覆盖时，不再合入；仍有独立译名、颜色或线路增量时，继续审核这些增量。

## 第 6 步：形成结论、标签和回复

每个议题设置一个主状态，移除互相冲突的主状态和旧的等待标签。保留 `resources` 及仍适用的辅助标签。

| 结论 | 主状态 | 处置 |
| --- | --- | --- |
| 全部实际增量通过，PR 内容和检查符合要求 | `ready for merge` | 准备合并 |
| 色值、前景色、名称、归类、线路 ID、删除或回退等数据有误 | `need fixing` | 关闭，修改后新开 |
| 来源无效、缺失、过时、降级或不足以支撑修改 | `invalid references` | 关闭，补充或更换资料后新开 |
| 虚构、空白、无关内容或没有实际修改 | `invalid content` | 关闭；虚构内容可附加 `fictional` |
| 占位文字、数据块、JSON 或字段格式错误 | `invalid format` | 关闭，修正后新开 |
| 同作者同城市的较早投稿 | `duplicate` | 指向该作者最新投稿并关闭 |
| 修改已被其他已合入内容完整覆盖 | `better version exists` | 指向覆盖它的议题或提交并关闭 |
| bot、权限、网络或构建环境故障 | `error` | 停止当前处理，报告故障及恢复步骤，不作内容拒绝结论 |

多个问题并存时，列出所有已确认且可复核的问题。主状态选择最先阻止正常处理的原因：先格式，再收录范围，再来源，再具体数据错误。队列中已确定的同作者较早稿直接按 `duplicate` 处理。

不得将尚未查证的猜测写成错误。材料不足以判定时，准确说明“缺少哪项依据”，按 `invalid references` 关闭后补充重投。

投稿从一开始就没有实际修改时，使用 `invalid content`；投稿原有修改在等待审核期间被其他合入内容完整覆盖时，使用 `better version exists`。

### 回复模板

以下中文为语义模板，实际发布前须翻译为对应城市或地区的官方语言。线路名、色号、ID、issue 编号和标签可保留原文。

通过并实际合并后：

```text
嗨，感谢您的支持与贡献！您的调色板已被合入并即将上线。
```

数据错误、来源不足或格式、内容无效：

```text
嗨，感谢您的支持与贡献！本次投稿未通过审核，原因如下：

- <线路 ID 或字段、提交内容、来源中的正确内容或缺失的具体依据>
- <其他已确认且可复核的问题>

您可以修正上述问题或补充资料后，新开一个议题，并附上本议题的编号。请不要再次尝试更新本议题 :)
```

同作者较早投稿：

```text
嗨，感谢您的支持与贡献！该投稿已被您后续提交的 #<latest> 替代，本议题按重复关闭。后续审核将在最新议题中进行。
```

已被合入内容覆盖：

```text
嗨，感谢您的支持与贡献！本次修改已被 #<covering_issue> 的合入内容完整覆盖，因此本议题关闭。如仍有其他修改，请基于最新调色板新开议题，并引用本议题编号。
```

## 第 7 步：汇报并执行处置

每个议题都先提交以下汇报，再按已明确获准的范围执行：

```text
议题：#<number> <title>
城市与国家或地区：<city.id / city.country>
队列位置：第 <i>/<n> 个
PR 与分支：<PR 链接 / bot-N>
审核版本：<main SHA / PR head SHA>
本次修改：<线路 ID、名称及修改项目>
参考资料：<来源等级、链接、日期、页码或位置>
原值依据：<改色或删除时填写；无法查明时明确说明>
逐项对比：<主线值、提交值、来源值和结论>
数据保留检查：<删除、ID 变化和回退检查结果>
PR 检查：<实际结果>
结论：通过 / 不通过 / 无效 / 重复关闭 / 已被覆盖 / 技术阻塞
主状态：<标签>
说明：<全部已确认问题或通过依据>
回复语言与正文：<完整回复>
Issue 关闭原因：completed / not planned / 不关闭（技术阻塞）

待执行 gh CLI：
1. <针对实际议题、PR 和分支的命令>
2. <后续命令>

执行状态：等待确认 / 已获授权待执行 / 已执行及结果
```

### 通过

1. 同步 `ready for merge` 标签。
2. 确认 PR head 仍是已审核的提交，检查均通过；若数据或基线变化，先重新审核。
3. 合并 PR 并删除对应分支。
4. 确认 PR 实际处于 `MERGED` 状态，再发布“已合入”的回复。仅进入自动合并或合并队列不算已经合并。
5. 检查 issue 是否已按完成关闭；未关闭则手动以 `completed` 关闭。
6. 继续处理下一条投稿，重新检查主线和 bot 产物。后续稿件只有在有效修改全部被覆盖时才按冗余关闭。

### 不通过、无效、重复或已被覆盖

1. 同步对应主状态标签。
2. 发布已审核的回复，说明全部已确认问题或被替代的议题。
3. 关闭关联的未合并 PR，删除对应 bot 分支；没有 PR 或分支时跳过相应动作。
4. 使用 `not planned` 原因关闭 issue。
5. 继续处理队列中的下一条投稿。拒绝本身不触发后续稿的重建。

### 技术阻塞

1. 记录失败步骤、日志和受影响的 PR 或分支。
2. 汇报所需恢复动作；若需修改远端状态，先取得相应授权。
3. 不宣称投稿通过，也不将环境或 bot 故障当作内容错误关闭投稿。
4. 恢复后重新读取 issue 和 PR 内容，再继续审核。

## gh CLI 操作模板

以下命令使用 Bash。数字为示例，执行前替换为已核实的实际对象。认证 GitHub 操作在沙箱外运行，并使用本机代理。读取命令可直接执行；标签、评论、正文编辑、合并、关闭和删除命令按已明确获准的范围执行。

### 1. 设置本次审核变量

```bash
export HTTP_PROXY=http://127.0.0.1:1080
export HTTPS_PROXY=http://127.0.0.1:1080
palette_repo=railmapgen/rmg-palette
palette_issue=1234
palette_branch="bot-$palette_issue"
palette_tmp=$(mktemp -d /tmp/palette-review.XXXXXX)
```

### 2. 读取 issue 和同城市候选队列

```bash
gh issue view "$palette_issue" -R "$palette_repo" \
  --json number,title,author,body,createdAt,updatedAt,labels,comments,state,url

gh api --paginate "repos/$palette_repo/issues?state=open&per_page=100" \
  --jq '.[] | select(.pull_request == null) | {number,title,created_at,author:.user.login,body,html_url} | @json' \
  > "$palette_tmp/open-issues.jsonl"
```

逐条解析候选正文的 city JSON，筛选同城市 ID，再按作者和创建时间建立队列。不能只按标题中的城市名筛选后就认定已找全。

### 3. 查 PR、分支、实际文件和检查结果

```bash
gh pr list -R "$palette_repo" --head "$palette_branch" --state all \
  --json number,title,state,url,headRefName,baseRefName

gh api "repos/$palette_repo/git/ref/heads/$palette_branch" --jq '.object.sha'
```

从查询结果填写实际 PR 编号及正文城市 ID；先确认 ID 为合法城市代码，再用于路径。

```bash
palette_pr=1235
palette_city=examplecity
palette_file="public/resources/palettes/$palette_city.json"
palette_main=$(gh api "repos/$palette_repo/commits/main" --jq '.sha')
palette_head=$(gh pr view "$palette_pr" -R "$palette_repo" --json headRefOid --jq '.headRefOid')

gh pr view "$palette_pr" -R "$palette_repo" \
  --json number,state,headRefName,headRefOid,baseRefName,mergeable,statusCheckRollup,url
gh pr diff "$palette_pr" -R "$palette_repo"
gh pr checks "$palette_pr" -R "$palette_repo"

gh api "repos/$palette_repo/contents/$palette_file?ref=$palette_main" \
  --jq '.content' | base64 --decode > "$palette_tmp/main-palette.json"
gh api "repos/$palette_repo/contents/$palette_file?ref=$palette_head" \
  --jq '.content' | base64 --decode > "$palette_tmp/submitted-palette.json"
```

新增城市在主线不存在对应文件时，确认是预期的 404，并按新增审核；其他请求失败先查明原因。涉及城市或国家信息时，以同样方式读取对应配置文件。比较最新主线文件与投稿文件，不能只看旧分支的 diff。

### 4. 同步主状态标签

将 `palette_status` 设置为本议题的实际结论。以下命令保留一个主状态，并移除旧的等待标签。

```bash
palette_status='need fixing'
palette_label_args=(--add-label "$palette_status")
for palette_label in \
  'ready for merge' 'need fixing' 'invalid references' 'invalid content' \
  'invalid format' 'duplicate' 'better version exists' 'error' \
  'conformation required' 'hold' 'no response'; do
  if [ "$palette_label" != "$palette_status" ]; then
    palette_label_args+=(--remove-label "$palette_label")
  fi
done
gh issue edit "$palette_issue" -R "$palette_repo" "${palette_label_args[@]}"
```

### 5. 用文件准备回复

每次操作重新填写回复文件，并在发布前检查内容和语言。以下拒绝回复仅为中文语义示例。

```bash
palette_comment_file="$palette_tmp/issue-$palette_issue-comment.md"
cat > "$palette_comment_file" <<'EOF'
嗨，感谢您的支持与贡献！本次投稿未通过审核，原因如下：

- <已确认的问题及对应依据>

您可以修正上述问题或补充资料后，新开一个议题，并附上本议题的编号。请不要再次尝试更新本议题 :)
EOF
```

### 6. 拒绝、无效、重复或已被覆盖时关闭

先按步骤 4 同步实际主状态，再按步骤 5 准备相应回复。重复稿的回复必须指向该作者最新投稿；被覆盖稿必须指向已经合入的内容。

```bash
gh issue comment "$palette_issue" -R "$palette_repo" --body-file "$palette_comment_file"
```

确认存在关联的未合并 PR 和 bot 分支时，执行相应清理命令。若 PR 已合并，停止此关闭流程并重新核对议题状态；分支已不存在时跳过删除。

```bash
gh pr close "$palette_pr" -R "$palette_repo"
gh api --method DELETE "repos/$palette_repo/git/refs/heads/$palette_branch"
```

```bash
gh issue close "$palette_issue" -R "$palette_repo" --reason 'not planned'
gh issue view "$palette_issue" -R "$palette_repo" --json state,labels,url
```

### 7. 通过时合并

先将步骤 4 中的主状态改为 `ready for merge` 并同步。`palette_head` 必须是实际完成审核的提交，不得为绕过变化检查而直接替换为新 SHA。

```bash
gh pr checks "$palette_pr" -R "$palette_repo"
```

确认检查均通过且审核基线仍然适用后执行合并，并读取实际结果：

```bash
gh pr merge "$palette_pr" -R "$palette_repo" \
  --merge --delete-branch --match-head-commit "$palette_head"
gh pr view "$palette_pr" -R "$palette_repo" --json state,mergedAt,url
```

确认已实际合并后，重新填写通过回复文件并发布：

```bash
cat > "$palette_comment_file" <<'EOF'
嗨，感谢您的支持与贡献！您的调色板已被合入并即将上线。
EOF
gh issue comment "$palette_issue" -R "$palette_repo" --body-file "$palette_comment_file"
gh issue view "$palette_issue" -R "$palette_repo" --json state,url
```

如果 issue 仍未关闭，执行：

```bash
gh issue close "$palette_issue" -R "$palette_repo" --reason completed
```

### 8. 重建 bot 产物

只用于尚未完成审核、已确认需要重建的打开议题。先保存完整正文：

```bash
palette_body_file="$palette_tmp/issue-$palette_issue-body.md"
gh issue view "$palette_issue" -R "$palette_repo" --json body --jq '.body' \
  > "$palette_body_file"
```

核实保存成功且正文完整，取得关闭 PR、删除分支及编辑正文的许可后，清理实际存在的旧产物：

```bash
gh pr close "$palette_pr" -R "$palette_repo"
gh api --method DELETE "repos/$palette_repo/git/refs/heads/$palette_branch"
```

执行编辑前重新读取正文，确认没有覆盖投稿者的并发修改，再追加注释触发 issuebot：

```bash
gh issue view "$palette_issue" -R "$palette_repo" --json body --jq '.body' \
  > "$palette_body_file"
palette_stamp=$(date -u '+%Y-%m-%dT%H:%M:%SZ')
printf '\n<!-- retrigger issuebot: %s -->\n' "$palette_stamp" >> "$palette_body_file"
gh issue edit "$palette_issue" -R "$palette_repo" --body-file "$palette_body_file"

gh run list -R "$palette_repo" --workflow issuebot.yml --limit 20 \
  --json databaseId,displayTitle,status,conclusion,createdAt,event,url
```

按运行时间、事件和议题信息核对对应运行后，填写实际运行 ID：

```bash
palette_run=123456789
gh run view "$palette_run" -R "$palette_repo"
gh run watch "$palette_run" -R "$palette_repo" --exit-status
gh pr list -R "$palette_repo" --head "$palette_branch" --state open \
  --json number,title,url,headRefName,baseRefName
```

重新获取 PR 编号、head SHA、实际文件和检查结果，从第 3 步继续。重建失败时报告技术阻塞，不反复删除或编辑议题。

## 停止条件

出现以下任一情况时停止当前处理并向人工汇报：

- 当前队列已经处理完毕。
- 合并、关闭、删除或编辑操作尚未取得所需授权。
- bot、权限、网络或构建环境故障尚未排除。
- 审核后的 issue、PR 内容或相关主线数据发生变化，需要重新核对。
- 实际 PR 未体现已经核实的投稿变更，需要修复产物。

资料不足属于不通过，应明确说明缺失项并关闭后重投。停止条件不用于保留有内容问题的原议题等待补证。
