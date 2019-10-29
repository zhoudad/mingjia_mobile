import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import px from '../../../utils/px'

export default class Policy extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<ScrollView style={{ paddingHorizontal: px(70), paddingVertical: px(50), }}>
				<Text style={{ color: '#999999', lineHeight: px(60) }}>
					<Text style={{ textAlign: 'center', fontSize: px(36), color: '#333' }}>《明家》用户服务协议</Text>{'\n'}
					<Text style={{ color: '#333', fontWeight: 'bold' }}>一、服务协议的确定</Text>{'\n'}
					明家APP，隶属于浙江永拓信息科技有限公司（以下简称“明家”）。依据本协议以下条款在“明家”登录的用户（以下简称“用户”）同意以下条款，方有资格享受“明家”提供的相应服务，并受本协议条款的约束。
             <Text style={{ color: '#333', fontWeight: 'bold' }}>二、内容所有权</Text>{'\n'}
					<Text> 1.“明家”提供的网络服务内容可能包括：文字、软件、声音、图片、录像、图表、三维模型等。所有这些内容受版权、商标和其他财产所有权法律的保护。</Text>{'\n'}
					<Text>2.用户只有在获得“明家”或其他相关权利人的授权之后才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。</Text>
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>三、用户信息的提供</Text>{'\n'}
					为保障用户的合法权益，避免在服务时因用户登录资料与真实情况不符而发生纠纷，请用户登录时务必按照真实、全面、准确的原则填写。
					对因用户自身原因而造成的不能服务情况，“明家”概不负责。如果用户提供的资料包含不正确的信息，“明家”保留结束该用户使用服务资格的权利。
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>四、用户资料隐私保护</Text>{'\n'}
					<Text>
						1.保护用户隐私是“明家”的一项基本政策，“明家”保证不对外公开或向第三方提供用户登录资料及用户在使用网络服务时存储在“明家”的非公开内容，但下列情况除外：
					{'\n'}<Text>（a）事先获得用户的明确授权；</Text>{'\n'}
						<Text>（b）根据有关法律法规要求；</Text>{'\n'}
						<Text>（c）按照相关政府主管部门的要求；</Text>{'\n'}
						<Text>（d）为维护社会公众的利益；</Text>{'\n'}
						<Text>（e）为维护建行的合法权益。</Text>
					</Text>{'\n'}
					<Text>2.“明家”可能会与第三方合作用户提供相关的网络服务，在此情况下，如该第三方同意承担与“明家”同等的保护用户隐私责任，则“明家”可将用户登录资料提供给该第三方。</Text>{'\n'}
					<Text>3.在不透露单个用户隐私资料前提下，“明家”有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</Text>
					{'\n'} <Text style={{ color: '#333', fontWeight: 'bold' }}>五、用户资料安全</Text>{'\n'}
					对用户注册信息“明家”提供最大限度的安全保障。同时，用户务必对其用户手机号、个人微信号等信息保密，以免被盗用或遭窜改。用户如发现上述情况请立即与“明家”联系。
					{'\n'} <Text style={{ color: '#333', fontWeight: 'bold' }}>六、用户享有的权力和服务</Text>{'\n'}
					<Text>1.用户有权随时对自己的个人资料进行查询、修改、删除。为客户服务安全考虑，账号不能随意更改。</Text>{'\n'}
					<Text>2.用户享有在“明家”上各种服务内容。</Text>{'\n'}
					<Text>3.“明家”服务的具体内容由“明家”根据实际情况提供，例如评论、浏览新房等。“明家”保留随时变更、中断或终止部分或全部网络服务的权利。</Text>{'\n'}
					<Text>4.用户理解，“明家”仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如电脑、调制解调器及与其他接入互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均应由用户自行负担。</Text>
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>七、用户管理</Text>{'\n'}
					不得利用“明家”危害国家安全、泄露国家秘密，不得侵犯国家社会集体和公民合法权益，不得利用“明家”制作、复制和传播下列信息：
          {'\n'}<Text>1.煽动抗拒、破坏宪法和法律、行政法规实施的；</Text>{'\n'}
					<Text>2.煽动颠覆国家政权，推翻社会主义制度的；</Text>{'\n'}
					<Text>3.煽动分裂国家、破坏国家统一的；</Text>{'\n'}
					<Text>4.煽动民族仇恨、民族歧视，破坏民族团结的；</Text>{'\n'}
					<Text> 5.捏造或歪曲事实，散步谣言，扰乱社会秩序的；</Text>{'\n'}
					<Text>6.宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；</Text>{'\n'}
					<Text>7.公然侮辱他人或捏造事实诽谤他人的，或者进行其他恶意攻击的；</Text>{'\n'}
					<Text>8.损害国家相关信誉的；</Text>{'\n'}
					<Text>9.其他违反宪法和法律行政法规的；</Text>{'\n'}
					<Text>10.进行商业广告行为的。</Text>{'\n'}
					“明家”声明用户的系统记录有可能作为用户违反法律的依据。
					 {'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>八、免责声明</Text>{'\n'}
					<Text>1.用户明确同意其使用“明家”网络服务存在的风险将完全由其自己承担；因其使用“明家”网络服务而产生的一切后果也有其自己承担，“明家”对用户不承担任何责任。</Text>{'\n'}
					<Text>2.“明家”不担保网络服务一定满足用户的要求，也不担保网络服务会不会中断，对网络服务的及时性、安全性、准确性都不作担保。</Text>
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>九、服务变更、中断或终止</Text>{'\n'}
					<Text>1.如因系统维护或升级的需要而暂停网络服务，“明家”将尽可能事先进行通告。</Text>
					<Text>2.如发生下列任何一种情形，“明家”有权随时中断或终止向用户提供本协议项下的网络服务而无需通知用户；
						{'\n'}<Text>（a）用户提供的个人资料不真实；</Text>
						{'\n'}<Text>（b）用户违反本协议中规定的使用规则。</Text>{'\n'}
					</Text>
					<Text>3.除前款所述情形外，“明家”同时保留在不事先通知用户情况下随时中断或终止部分或全部网络服务的权利，
						对于所有服务的中断或终止而造成的任何损失，“明家”无需对用户或任何第三方承担任何责任。</Text>
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>十、违约赔偿</Text>{'\n'}
					用户同意保障和维护“明家”及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给“明家”或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>十一、修改协议</Text>
					{'\n'}<Text>1.“明家”将可能不时地修改本协议有关条款，一旦条款内容发生变动，“明家”将会在相关页面提示修改内容。</Text>
					{'\n'}<Text>2.如果不同意“明家”对服务条款所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为用户接受服务条款的变动。</Text>
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>十二、法律管辖</Text>{'\n'}
					<Text>1.本协议的订立、执行和解释及争议的解决均适用中国法律。</Text>{'\n'}
					<Text>2.如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向“明家”所在地的人民法院提起诉讼。</Text>
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>十三、通知和送达</Text>{'\n'}
					本协议项下所有的通知均可通过重要页面公告、电子邮件或常规信件传送等方式进行；该等通知于发送之日视为己送达收件人。
{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>十四、其他规定</Text>{'\n'}
					<Text>1.本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定之外，未赋予本协议各方其他权利。</Text>
					{'\n'}<Text>2.如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应用有效并且有约束力。</Text>
					{'\n'}<Text>3.本协议中的标题仅为方便而设，在解释本协议时应被忽略。</Text>
					{'\n'}<Text>本协议适用中华人民共和国法律，因任何一方出现违反法律的行为而造成协议条款的不能执行，都应有责任方自行负责并补偿由此而给对方造成的损失。</Text>
					{'\n'}<Text>本协议最终解释权属于浙江永拓信息科技有限公司。</Text>
					{'\n'}<Text>客服中心热线：0571-87139280</Text>
					{'\n'}<Text>管理员信箱:18189026@qq.com</Text>
					{'\n'}<Text style={{ textAlign: 'center', fontSize: px(36), color: '#333' }}>隐私政策</Text>{'\n'}
					<Text>
						“明家”尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，“明家”会按照本隐私政策的规定使用和披露您的个人信息。
						但“明家”将以高度的勤勉、审慎义务对待这些信息。除本隐私政策另有规定外，在未征得您事先许可的情况下，“明家”不会将这些信息对外披露或向第三方提供。
						“明家”会不时更新本隐私权政策。您在同意“明家”服务使用协议之时，即视为您已经同意本隐私政策全部内容。本隐私政策属于“明家”服务协议不可分割的一部分。
					</Text>{'\n'}
					<Text style={{ color: '#333', fontWeight: 'bold' }}> 	1.适用范围	</Text>{'\n'}
					<Text>a）在您注册“明家”账号时，您根据“明家”要求提供的个人注册信息； </Text>{'\n'}
					<Text>b）在您使用“明家”网络服务访问“明家”时，“明家”自动接收并记录您的信息，包括但不限于您的IP地址、访问日期和时间、您手机安装应用及您需求的页面记录等数据； </Text>{'\n'}
					<Text>c）“明家”通过合法途径从商业伙伴处取得用户个人数据； </Text>
					<Text>您了解并同意，以下信息不适用本隐私政策；	</Text>
					<Text>a)您在使用“明家”提供的搜索服务时，输入的关键字信息； </Text>{'\n'}
					<Text>b)“明家”收集到的您在“明家”发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情； </Text>{'\n'}
					<Text>c)违反法律规定或违反“明家”规则行为及“明家”已对您采取的措施。 </Text> {'\n'}
					<Text style={{ color: '#333', fontWeight: 'bold' }}>2.信息使用	</Text>
					{'\n'}<Text>a)“明家”不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，
						或该第三方和“明家”（含“明家”关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能访问的所有这些资料。</Text>{'\n'}
					<Text>b)“明家”亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何“明家”平台用户从事上述活动，一经发现，
							“明家”有权立即终止与该用户的服务协议。</Text>{'\n'}
					<Text>c)为服务用户的目的，“明家”可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出的产品和服务信息，
							或者与“明家”合作伙伴共享信息以便他们向您发送有关产品和服务的信息（后者需要您事先同意）</Text>{'\n'}
					<Text style={{ color: '#333', fontWeight: 'bold' }}>3.信息披露</Text>{'\n'}
					在如下情况下，“明家”将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息；
					<Text>a）经您事先同意，向第三方披露；</Text>{'\n'}
					<Text>	b）为提供您所要求的产品和服务，而必须和第三方分享您的个人信息； </Text>{'\n'}
					<Text>c）根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</Text>{'\n'}
					<Text>d）如您出现违反中国有关法律、法规或者“明家”服务协议或相关规则的情况，需要向第三方披露； </Text>{'\n'}
					<Text>e）如您是适格的知识产权投诉人并已提起诉讼，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷； </Text>{'\n'}
					<Text>f）在“明家”平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，“明家”有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。 </Text>{'\n'}
					<Text>g）其他“明家”根据法律、法规或网站政策认为合适的披露。 </Text>{'\n'}
					<Text style={{ color: '#333', fontWeight: 'bold' }}>4.信息存储和交换</Text>{'\n'}
					“明家”收集的有关您的信息和资料将保存在“明家”服务器上。
					{'\n'}<Text style={{ color: '#333', fontWeight: 'bold' }}>5.Cookie的使用</Text>{'\n'}
					<Text>a)在您未拒绝接受cookies的情况下，“明家”会在您的计算机上设定或取用cookies，以便您能登录或使用依赖于cookies的“明家”服务或功能。“明家”使用cookies可为您提供更加周到的个性化服务，包括推广服务。</Text>{'\n'}
					<Text>	b)您有权选择接受或拒绝接受cookies，则您可能无法登录或使用依赖于cookies的“明家”网络服务或功能。</Text>{'\n'}
					<Text>c)通过“明家”所设cookies所取得的有关信息，将适用本政策。</Text>{'\n'}
					<Text style={{ color: '#333', fontWeight: 'bold' }}>6.信息安全</Text>{'\n'}
					<Text>a)“明家”账号均有安全保护功能，请妥善保管您的用户名及密码信息“明家”将通过对用户密码进行加密等安全措施确保您的信息不丢失，
						不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。</Text>{'\n'}
					<Text>b)在使用“明家”网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。
请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是登录过“明家”手机号及微信号发生泄漏，请您立即联络“明家”客服，以便“明家”采取相应措施。。</Text>{'\n'}
				</Text>
			</ScrollView>
		);
	}
}
