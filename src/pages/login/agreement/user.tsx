import { View } from "@tarojs/components";
import { useEffect } from "react";
import Taro from "@tarojs/taro";
import "./index.less";

export default function AgreementUser() {
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: "用户协议",
    });
  }, []);
  return (
    <View className="content">
      <View className="h1">用户隐私协议</View>
      <View className="h1">用户隐私政策</View>
      <View>更新时间：2023 年 7月 11日</View>
      <View>生效时间：2023 年 7月 11日</View>
      <View className="line"></View>
      <View className="h2">引言</View>
      <View>
        上海海湃领客文化科技有限公司严格遵守法律法规，按照业界成熟的安全与隐私标准，保护第三方开发者和终端用户的个人信息。
      </View>
      <View>
        在登陆、注册、安装、接入、使用海湃领客旗下产品和/或服务前（以下称“本服务”），包括但不限于
        “CeMetaAI营销应用平台”以及未来海湃领客所推出的全部产品，请第三方开发者和/或终端用户务必仔细阅读本声明。同时，请第三方开发者将本声明提供给第三方的终端用户，以便终端用户了解本声明相关内容并获得终端用户同意，第三方开发者应仅在获得终端用户的同意后使用本产品并处理终端用户的个人信息。如果第三方开发者或终端用户不同意本声明，应立即停止接入及使用本产品和/或服务。
      </View>
      <View>
        我们将逐一向您展示我们处理、管理以及保护您使用本服务的任何部分或全部的过程中我们收集的个人信息。
      </View>
      <View className="h3">
        本政策中与您的权益（可能）密切相关的重要条款，已采用加粗字体来特别提醒您，请您重点查阅。
      </View>
      <View className="h3">
        您点击“同意”或“下一步”，或您使用本服务，或者以其他任何明示或者默示方式表示接受本协议的，均视为您已阅读并同意签署本协议。本协议即在您与
        “CeMetaAI营销应用平台”之间产生法律效力，成为双方均具有法律约束力的法律文件。
      </View>
      <View className="h2">一、注册/登录</View>
      <View>
        1.手机号码登录：为了完成账号的创建、登录以便我们为您提供服务，您在注册、登录“CeMetaAI营销应用平台”时需要向我们提供您的手机号码、登录密码信息。如果您拒绝提供手机号码进行核验，将导致注册/登录失败，但不影响您使用本网站的基础功能。
      </View>
      <View>
        2.授权第三方登录：您可以使用第三方账号注册、登录“CeMetaAI营销应用平台”，但需要授权我们获取您在第三方平台的信息（头像、昵称等公开信息以及您授权的其他信息），用于生成与该第三方账号绑定的（“CeMetaAI营销应用平台”）账号，使您可以直接注册、登录并使用“CeMetaAI营销应用平台”
        服务。通过第三方账号注册、登录后，您可以自主选择进行【手机号绑定】操作，通过向我们提供您的手机号码，以实现该账号与您手机号码的绑定，后续您可自主选择通过第三方账号或该手机号码进行登录、使用。
      </View>
      <View className="h2">
        二、如何收集和使用第三方开发者和/或终端用户的个人信息
      </View>
      <View>
        我们遵循正当、合法、必要的原则，基于本声明所述的以下目的，收集和使用：
      </View>
      <View>1.第三方开发者和/或终端用户主动提供或我们直接收集的个人信息；</View>
      <View>2.第三方终端用户在使用本产品和/或服务过程中产生的个人信息；</View>
      <View>
        3.从第三方开发者或者其他第三方获取的第三方开发者和/或终端用户的个人信息。
      </View>
      <View>
        我们通常会在征得第三方开发者和/或终端用户同意后收集个人信息。我们会在本声明中载明收集的个人信息用途，如果我们要将收集个人信息用于本声明未载明的其它用途，我们会以合理的方式向第三方开发者和/或终端用户告知，并在使用前再次征得第三方开发者和/或终端用户的同意。
      </View>
      <View>1.第三方开发者和/或终端用户主动提供或我们直接收集的个人信息</View>
      <View>
        为实现本产品的业务功能，我们可能需要向第三方开发者和/或终端用户收集相关个人信息。具体信息如下：
      </View>
      <View>1.1 信息反馈功能</View>
      <View>
        当您通过本隐私政策载明的联系方式与我们联系，进行咨询或提出建议、意见、投诉时，为了您的账号与系统安全，我们可能需要您提供
        <View className="h3">必要的个人信息以核验您的真实用户身份。</View>
        为了便于与您联系、尽快帮助您解决问题或记录相关问题的处理方案及结果，我们可能会保存您与我们沟通、通信/通话记录及相关内容（包括账号信息、您为了证明相关事实提供的其他信息，或您留下的联系方式信息）。
        <View className="h3">
          如您拒绝提供上述信息，我们可能无法及时向您反馈回复，我们承诺上述信息仅用于调查事实与帮助您解决问题。
        </View>
      </View>
      <View>1.2 订单支付</View>
      <View>
        为完成【会员升级】订单支付、保障交易安全，我们需要收集您的
        <View className="h3">
          交易金额及订单支付相关信息，并通过安全方式与支付机构（如微信等金融机构）进行前述部分或全部信息的共享（包括支付机构直接以SDK形式收集）。
        </View>
        同时，为及时知悉并确认您的支付状态、为您解决纠纷、提供客服及售后服务等，我们可能通过支付机构收集您的支付状态及支付进度信息。
      </View>
      <View className="h2">安全保障</View>
      <View>
        我们致力于为您提供安全、可信的服务与使用环境。为了维护我们服务的正常运行，保护您或其他用户或公众的合法利益免受损失，我们会收集用于保障服务安全稳定运行的必要信息。为了保障“CeMetaAI营销应用平台”的安全运行、运营质量及效率，我们会收集您的浏览器类型、使用的语言、屏幕分辨率、IP地址、网络相关信息（包括Wifi状态、Wifi参数、Wifi列表）、MAC地址等设备标识符、订单信息、操作、使用、服务日志。我们可能使用您的账号信息、设备信息、网络相关信息、服务日志信息，以及我们关联方、合作方在获得您授权或依法可以提供的信息，用于判断账号及交易安全、进行身份验证、识别违法违规情况、检测及防范安全事件，并依法采取必要的记录、分析、处置措施。
      </View>
      <View className="h2">1.4 功能使用</View>
      <View>
        体验AI营销应用及创建AI营销助手是
        “CeMetaAI营销应用平台”的基础功能。在您使用该功能的过程中，您需要上传您的问题信息（包括文字、图片、视频、音频等），以便我们使用这些信息向您输出对应回答内容。如您拒绝我们收集和处理前述问题信息，可能会影响您正常使用CeMeta
        AI营销应用平台 提供的部分或全部功能。在您使用
        AI营销应用时，我们会记录您的使用情况。如果您未登录账号，我们会通过设备对应的标识符信息来记录您上传的【问题信息】。如果您已登录账号，我们会通过您的
        账号（平台账号）记录您所上传的【问题信息】。
      </View>
      <View className="h2">
        2.我们从第三方获得的第三方开发者和/或终端用户的个人信息
      </View>
      <View>
        我们可能从第三方开发者授权同意的第三方（我们的合作方）处间接获取第三方开发者和/或终端用户的个人信息，获取的个人信息是为实现本产品和/或服务必要功能所必需的最少数量。
      </View>
      <View className="h2">
        我们会在收集前要求第三方对个人信息来源的合法性作出承诺，如基于取得终端用户同意处理个人信息时，我们会要求第三方向开发者和/或终端用户告知共享的目的、信息等内容，在依法取得开发者和/或终端用户同意后收集个人信息，确保在已获得的个人信息处理的授权同意范围内进行共享。
      </View>
      如第三方有违反法律法规要求或约定的行为，我们会立即停止从该方收集信息、停止合作并采取相应的补救措施将损失减少到最小；同时，我们会使用不低于对自身用户个人信息同等的保护水平对间接获取的个人信息进行保护，在间接获取个人敏感信息时，我们会采用更加严格的（如传输加密等）安全保障措施。
      <View className="h2">
        3.以下情形中，我们收集、使用个人信息无需征得第三方开发者和/或终端用户的授权同意：
      </View>
      <View>（1）为订立、履行合同所必需；</View>
      <View>（2）为履行法定职责或者法定义务所必需；</View>
      <View>
        （3）为应对突发公共卫生事件，或者紧急情况下为保护自然人的生命健康和财产安全所必需；
      </View>
      <View>
        （4）为公共利益实施新闻报道、舆论监督等行为，在合理的范围内处理个人信息；
      </View>
      <View>
        （5）依照法律规定在合理的范围内处理个人自行公开或者其他已经合法公开的个人信息；
      </View>
      <View>（6）法律行政法规规定的其他情形。</View>
      <View className="h2">
        特别提示：如我们收集的信息无法单独或结合其他信息识别到第三方开发者和/或终端用户的个人身份，其不属于法律意义上的个人信息。
      </View>
      <View className="h2">4.个人信息的使用规则</View>
      <View>
        （1）我们会根据本声明和/或与第三方开发者的合同约定，并仅为实现本产品产品和/或服务功能，对所收集的个人信息进行处理。
        <View className="h3">
          若需要将收集的个人信息用于其他目的，我们会以合理方式告知第三方开发者和/或终端用户，并在第三方开发者获得终端用户同意后和/或单独获得终端用户同意后进行使用。
        </View>
      </View>
      <View className="h2">
        （2）我们向第三方开发者提供的产品和/或服务停止运营后，或者第三方开发者和/或终端用户撤回个人信息的授权后，或者在第三方开发者和/或终端用户注销账号后，我们将会于合理的时间内销毁或匿名化处理从第三方开发者和/或终端用户处接收的所有个人信息，除非法律另有规定。
      </View>
      <View className="h2">三、第三方开发者的合规义务</View>
      <View className="h2">
        如您是第三方开发者，在您将本产品适配、集成或装载到您的产品、应用或服务前,您应仔细阅读并同意我们在官网公示的相关服务协议、本规则及/或第三方开发者合规指南(或具有同样性质的相关法律文件),并对您适配、集成或装载本产品的产品的收集、使用个人信息情况进行合规自查。您应当:
      </View>
      遵守法律、法规和监管要求收集、使用和处理终端用户的个人信息,包括但不限于制定和公布有关个人信息保护的隐私政策等;
      <View>
        2.在集成产品前，您应告知终端用户产品处理终端用户个人信息的情况，并依法获得终端用户的同意；
      </View>
      <View className="h2">
        3.在获得终端用户的同意前,除非法律法规另行允许,不应收集终端用户的任何个人信息，不应启用本产品及/或相关服务;
      </View>
      <View>
        4.已经向终端用户提供了易于操作且满足法律要求及监管部门要求的用户权利实现机制,并说明了终端用户可以如何行使查阅、复制、修改、删除个人信息,如何撤回同意,如何便捷退订个性化推送,以及如何限制个人信息处理、转移个人信息、获取个人信息副本和注销账号等权利;
      </View>
      <View>
        如您是终端用户，请您留意，我们已经要求第三方开发者遵守以上合规义务。我们将尽合理注意义务监督第三方开发者使用本产品处理您的个人信息的行为,保护您个人信息的安全。请您注意,我们难以控制第三方开发者的所有处理个人信息行为,但如果我们发现第三方开发者未能满足前述任何一款或多款要求的合规承诺的,我们将立即采取相应措施以保护您的个人信息的安全(包括但不限于立即要求第三方开发者停止集成和应用本产品)。
      </View>
      <View></View>
      <View className="h2">四、如何使用Cookie和同类技术</View>
      <View className="h2">1.Cookie</View>
      <View>
        为确保本服务的正常运转，我们会使用相关技术向您的设备存储名为Cookie的小数据文件。Cookie通常包含标识符、站点名称以及一些号码和字符。我们可能会设置认证与保障安全性的Cookie，以确认您是否安全登录服务，或者是否遇到盗用、欺诈及其他不法行为。这些技术还会帮助我们改进服务效率，提升登录和响应速度。使用Cookie还可以帮助您省去重复您填写个人信息、输入搜索内容的步骤和流程。我们不会将Cookie用于本政策所述目的之外的任何用途。
      </View>
      <View className="h2">2.Do Not Track（请勿追踪）</View>
      <View>
        您可根据自己的偏好管理或删除Cookie。您可以清除您的设备上保存的所有Cookie，很多网络浏览器均设有Do
        Not Track功能，该功能可向网站发布Do Not
        Track请求。目前，主要互联网标准组织尚未设立相关政策来规定网站应如何应对此类请求。但如果您的浏览器启用了Do
        Not Track，那么我们的所有网站都会尊重您的选择。
      </View>
      <View></View>
      <View className="h2">
        五、如何共享、转让、公开披露第三方开发者和/或终端用户的个人信息
      </View>
      <View className="h2">1.共享</View>
      <View className="h2">
        我们不会与我们的关联公司、合作伙伴及第三方共享第三方开发者和/或终端用户的个人信息。
      </View>
      <View className="h2">2.转让</View>
      <View className="h2">
        我们不会将第三方开发者和/或终端用户的个人信息转让给任何公司、组织和个人，但以下情况除外：
      </View>
      <View>（1）事先获得第三方开发者和/或终端用户单独同意；</View>
      <View>
        （2）在涉及合并、分立、解散、被宣告破产等原因需要转移个人信息的，我们会向开发者和/或终端用户告知接收方的名称或者姓名和联系方式，并要求接收方继续履行个人信息处理者的义务。接收方变更原先的处理目的、处理方式的，我们会要求接收方重新取得开发者和/或终端用户的同意。
      </View>
      <View className="h2">3.公开披露</View>
      <View className="h2">
        我们不会公开披露第三方开发者和/或终端用户的个人信息，除非：
      </View>
      <View>（1）获得第三方开发者和/或终端用户的单独同意后；</View>
      <View>
        （2）在法律法规、法律程序、诉讼或政府主管部门强制要求的情况下。
      </View>
      <View></View>
      <View className="h2">
        六、如何存储第三方开发者和/或终端用户的个人信息
      </View>
      <View>1.存储方式和期限</View>
      <View>
        我们会通过安全的方式存储第三方开发者和/或终端用户的信息，包括本地存储、数据库和服务器日志。
      </View>
      <View>
        一般情况下，我们只会在为实现本声明所述目的所必需的最短时间内或法律法规规定或个人信息主体另行授权同意的条件/范围内存储第三方开发者和/或终端用户的个人信息。但在下列情况下，且仅出于下列情况相关的目的，我们有可能需要较长时间保留第三方开发者和/或终端用户的个人信息：
      </View>
      <View>（1）遵守适用的法律法规等有关规定；</View>
      <View>（2）遵守法院判决、裁定或其他法律程序的要求；</View>
      <View>（3）遵守相关政府机关或其他有权机关的要求；</View>
      <View>
        （4）为执行相关服务协议或本声明、维护社会公共利益、处理投诉/纠纷，保护我们的客户、我们或我们的关联公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。
      </View>
      <View className="h2">2.存储地域</View>
      <View>我们会按照法律法规规定，将境内收集的个人信息存储于中国境内。</View>
      <View>
        目前，我们不会跨境传输或存储第三方开发者和/或终端用户的个人信息。将来如需跨境传输或存储的，我们会向开发者和/或终端用户告知境外接收方的名称或者姓名、联系方式、处理目的、处理方式、个人信息的种类以及个人向境外接收方行使合法权利的方式和程序等事项，并征得开发者的同意和/或终端用户的单独同意，并满足法律法规所规定的其他条件。
      </View>
      <View></View>
      <View className="h2">
        七、如何保护第三方开发者和/或终端用户的个人信息安全
      </View>
      <View className="h2">1.安全保护措施</View>
      <View>
        我们已使用符合业界标准的安全防护措施保护第三方开发者和/或终端用户提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损毁、泄漏或丢失。
      </View>
      <View>
        我们采用业界领先的技术保护措施。我们使用的技术手段包括但不限于防火墙、加密（例如SSL）、去标识化或匿名化处理、访问控制措施等。此外，我们还会不断加强将集成到第三方上的安全能力。
      </View>
      <View>
        我们建立了专门保障个人信息安全的管理制度、流程和组织。我们也会审查该管理制度、流程和组织，以防未经授权的人员擅自访问、使用或披露用户的信息。
      </View>
      <View className="h2">2.安全事件处置措施</View>
      <View>
        若发生个人信息泄露、损毁、丢失等安全事件，我们会启动应急预案，阻止安全事件扩大。安全事件发生后，我们会及时以推送通知、邮件等形式向第三方开发者和/或终端用户告知安全事件的基本情况、我们即将或已经采取的处置措施和补救措施，以及我们对第三方开发者和/或终端用户的应对建议。
      </View>
      <View></View>
      <View className="h2">
        八、第三方开发者和/或终端用户如何管理其个人信息
      </View>
      <View>
        我们非常重视第三方开发者和/或终端用户对个人信息的管理，并尽全力提供对个人信息的查阅、复制、修改、删除、撤回同意、投诉举报以及设置隐私功能等的相关权利，以使第三方开发者和/或终端用户有能力保障自身的隐私和信息安全。
      </View>
      <View className="h2">1.针对第三方开发者</View>
      <View>
        （1）第三方开发者实现终端用户查阅、复制、修改、删除个人信息等权利的范围和方式将取决于第三方开发者使用的开发者平台功能设置。
      </View>
      <View>
        （2）第三方开发者在使用本产品的过程中，如果终端用户根据第三方开发者与我们的约定提出了个人信息相关的行权请求，并且第三方开发者已确定该等行权请求涉及到了第三方开发者向本产品提供的个人信息时，请及时通过本指引第九条所述方式联系我们，并附上必要的书面证明材料。我们将及时核验相关材料，并按照相关法律法规，以及本指引等法律文本中明确的规则，为第三方开发者提供相应的支持与配合。
      </View>
      <View>
        （3）第三方开发者可以联系客服处理，停止收集和处理终端用户的个人信息。
      </View>
      <View></View>
      <View className="h2">2.针对第三方终端用户</View>
      <View>由于第三方终端用户不是我们的直接用户，我们建议：</View>
      <View>
        终端用户有权查阅、复制、修改、删除、撤回同意其相关的个人信息，如希望行使以上权利，请通过开发者平台功能设置，也可以按照本声明第九条所述方式与我们联系。
      </View>
      <View>
        当终端用户直接向我们主张个人信息主体权利时，应提供必要的证明文件，我们还会对终端用户进行身份验证。我们会向第三方开发者核实终端用户身份以保障终端用户第三方账号安全的情况下，响应终端用户的相关请求；
      </View>
      <View>
        当终端用户直接向我们主张个人信息主体权利时，根据第三方开发者的隐私政策或个人信息保护声明，我们还可能将与终端用户个人信息相关的请求直接发送给该第三方开发者，要求其处理和/或寻求帮助。
      </View>
      <View className="h2">（1）查阅、复制和修改个人信息</View>
      <View>
        当终端用户所使用的第三方中某项功能由本产品和/或服务提供，终端用户可以在使用我们服务的过程中，向开发者查阅、复制、修改其在使用开发者产品中处理的个人信息，也可通过客服联系我们处理。
      </View>
      <View className="h2">（2）删除个人信息</View>
      <View>
        符合下列情形之一的，第三方开发者或终端用户可以请求我们删除其有关个人信息：
      </View>
      <View>a. 处理目的已实现、无法实现或者为实现处理目的不再必要；</View>
      <View>b. 我们停止提供服务，或者信息保存期限已届满；</View>
      <View>c. 终端用户撤回同意；</View>
      <View>d. 认为我们的处理违反法律、行政法规或者违反约定处理个人信息；</View>
      <View>e. 法律、行政法规规定的其他情形。</View>
      <View>
        我们将会根据第三方开发者或终端用户的删除请求进行评估，若满足相应规定，我们将会采取包括技术手段在内的相应步骤进行处理。
      </View>
      <View className="h2">（3）注销服务</View>
      <View>
        如终端用户希望注销具体产品或服务，可通过客服申请注销相应服务。
      </View>
      <View className="h2">3.响应第三方开发者和/或终端用户的合理请求</View>
      <View>
        我们会响应第三方开发者和/或终端用户上述的合理请求，如无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁盘上存放的信息）的请求，我们可能会予以拒绝。
      </View>
      <View>在以下情形中，我们将无法响应第三方开发者和/或终端用户的请求：</View>
      <View>（1）与我们履行法律法规规定的义务相关的；</View>
      <View>（2）与国家安全、国防安全直接相关的；</View>
      <View>（3）与公共安公共卫生、重大公共利益直接相关的；</View>
      <View>（4）与犯罪侦查、起诉、审判和执行判决等直接相关的；</View>
      <View>
        （5）我们有充分证据表明第三方开发者和/或终端用户存在主观恶意或滥用权利的；
      </View>
      <View>
        （6）出于维护第三方开发者和/或终端用户或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
      </View>
      <View>
        （7）响应第三方开发者和/或终端用户的请求将导致第三方开发者或其他个人、组织的合法权益受到严重损害的；
      </View>
      <View>（8）涉及商业秘密的。</View>
      <View className="h2">
        如第三方开发者和/或终端用户的对上述权利实现存在疑问，可以通过客服与我们联系。
      </View>
      <View></View>
      <View className="h2">九、如何处理儿童个人信息</View>
      <View className="h2">
        请第三方开发者确保是18周岁（含）以上人士。请第三方开发者理解并知悉，如果第三方是针对儿童用户的，请第三方开发者务必确保第三方终端用户（儿童）的监护人已经阅读并同意了第三方的隐私政策及本规则，并且经其同意后提供儿童个人信息给我们，以实现第三方开发者在隐私政策中所述的相关功能。
      </View>
      如果我们在不知情的情况下收集了儿童的个人信息，我们将及时对其进行删除，除非法律法规要求我们保留此类资料。如果第三方开发者和/或终端用户认为我们错误或意外地向儿童收集了信息，请通过客服联系我们，如果经我们发现第三方开发者未获得儿童的监护人同意向我们提供儿童个人信息的，我们将尽快删除该儿童的个人信息并确保不对其进一步处理。
      <View></View>
      <View className="h2">十、如何变更与更新本声明</View>
      <View>
        为给第三方开发者提供更好的服务以及随着本平台产品和/或服务的不断发展与变化，我们可能会适时对本声明进行修订。
      </View>
      <View className="h2">
        当本声明的条款发生变更时，我们会在版本更新时以弹窗、红点提示、网站公告等方式进行提示，并说明生效日期。此外，如果更新后的本声明对第三方终端用户的权利有所影响，还需要请第三方开发者适时更新第三方的隐私政策。
      </View>
      对于重大变更，我们还会提供更为显著的通知（包括对于某些服务，我们会通过电子邮件或站内信形式或公告形式发送通知，说明本声明的具体变更内容）。因此，请随时查看和了解本声明内容。如果第三方开发者和/或终端用户不同意接受本声明，请停止接入和使用我们的服务。
      <View>本声明所指的重大变更包括但不限于：</View>
      <View>
        1.我们的服务模式发生重大变化。如处理个人信息的目的、类型、个人信息的使用方式等；
      </View>
      <View>
        2.我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产、并购等引起的所有者变更等；
      </View>
      <View>3.个人信息共享、转让或公开披露的主要对象发生变化；</View>
      <View>4.个人信息处理方面的权利及其行使方式发生重大变化；</View>
      <View>
        5.负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化；
      </View>
      <View>6.个人信息安全影响评估报告表明存在高风险。</View>
      <View></View>
      <View className="h2">十一、联系方式</View>
      <View>如有任何问题，请发邮件至 wangjingyi@cenbo.cn</View>
    </View>
  );
}
