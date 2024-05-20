import {
  Button,
  Cell,
  Checkbox,
  Field,
  Tab,
  Tabs,
  Dialog,
} from "@antmjs/vantui";
import { Picker, View, Navigator, Text, Label } from "@tarojs/components";
import { useEffect, useState } from "react";

import { useCapsuleHeight } from "@/hooks/pagePositionCapsuleHooks";
import Taro from "@tarojs/taro";

import { initializationTime, useCountdown } from "@/hooks/utils";
import { verifyPhone } from "@/common/verifyUtils";
import BaseBgLogo from "@/components/base/baseBgLogo";
import BaseDialogContent from "@/components/base/baseDialogContent";
import BaseButton from "@/components/base/baseButton";
import { companyList, login, teamList, verifyCode } from "@/apis/user";
import { ICompanyInfo, ITeamInfo } from "@/types/user";

import { setUserStore } from "@/store/user";
import "./index.less";

const Dialog_ = Dialog.createOnlyDialog();
export default function Login() {
  const [countdown, setCountdown] = useCountdown();
  const [capsuleHeight] = useCapsuleHeight();
  const [company, setCompany] = useState<ICompanyInfo["company"]>([]);
  const [team, setTeam] = useState<ITeamInfo["teamList"]>([]);
  const [selectCompanyIdx, setSelectCompanyIdx] = useState(-1);
  const [selectTeamIdx, setSelectTeamIdx] = useState(-1);
  const [verifyForm, setVerifyForm] = useState({
    phone: "",
    code: "",
    clause: false,
  });

  useEffect(() => {
    getCompanyList();
  }, [verifyForm.phone]);

  const getCompanyList = async () => {
    const { phone } = verifyForm;
    if (verifyPhone(phone)) {
      const res = await companyList({
        account: phone,
      });
      setCompany(res.company || []);
    } else {
      setCompany([]);
      setTeam([]);
      setSelectCompanyIdx(-1);
      setSelectTeamIdx(-1);
    }
  };

  const getTeamList = async (_company: ICompanyInfo["company"][0]) => {
    const res = await teamList(
      {
        keyword: _company.name,
        phone: verifyForm.phone,
      },
      {
        "x-company": _company.id,
      }
    );
    setTeam(res.teamList);
  };

  const sendVerifyCode = async () => {
    sendCode();
    // 发送验证码接口
  };

  const sendCode = async () => {
    try {
      await verifyCode({
        phone: verifyForm.phone,
        type: "login-phone-code",
      });
      Taro.showToast({
        icon: "none",
        title: "验证码已发送，请注意查收",
      });
      setCountdown();
    } catch (error) {
      console.log(error);
    }
  };

  const verifyCodeDisabled = () =>
    !verifyPhone(verifyForm.phone) || countdown !== initializationTime;

  const loginBtnDisabled = () =>
    !verifyPhone(verifyForm.phone) ||
    selectCompanyIdx === -1 ||
    selectTeamIdx === -1 ||
    verifyForm.code.length !== 6;

  const verifyLoginFormElement = () => {
    return (
      <>
        <Field
          value={verifyForm.phone}
          renderTitle={<View className="form-item-label">手机号</View>}
          titleWidth={Taro.pxTransform(70)}
          placeholder="请输入手机号"
          clearable
          maxlength={11}
          className="form-item"
          onChange={(e) =>
            setVerifyForm((prev) => ({
              ...prev,
              phone: e.detail,
            }))
          }
        />
        {/* {verifyPhone(verifyForm.phone) && ( */}
        <>
          <Picker
            mode="selector"
            range={company}
            rangeKey="name"
            onChange={(e) => {
              setSelectCompanyIdx(+e.detail.value);
              getTeamList(company[+e.detail.value]);
            }}
          >
            <Cell
              className="form-item"
              renderTitle={<View className="form-item-label">企业选择</View>}
              isLink
              // @ts-ignore
              value={
                company[selectCompanyIdx]?.name || (
                  <View className="van-cell__value_999">请选择企业</View>
                )
              }
              arrowDirection="down"
            ></Cell>
          </Picker>
          <Picker
            mode="selector"
            range={team}
            rangeKey="name"
            onChange={(e) => {
              setSelectTeamIdx(+e.detail.value);
            }}
          >
            <Cell
              className="form-item"
              renderTitle={<View className="form-item-label">团队</View>}
              isLink
              // @ts-ignore
              value={
                team[selectTeamIdx]?.name || (
                  <View className="van-cell__value_999">请选择团队</View>
                )
              }
              arrowDirection="down"
            ></Cell>
          </Picker>
        </>
        <Field
          className="form-item"
          center
          titleWidth={Taro.pxTransform(70)}
          renderTitle={<View className="form-item-label">验证码</View>}
          value={verifyForm.code}
          onChange={(e) =>
            setVerifyForm((prev) => ({
              ...prev,
              code: e.detail,
            }))
          }
          type="number"
          maxlength={6}
          clearable
          placeholder="请输入验证码"
          border={false}
          renderButton={
            <Button
              size="small"
              type="primary"
              onClick={sendVerifyCode}
              disabled={verifyCodeDisabled()}
              color="#171B27"
            >
              {countdown === initializationTime
                ? "发送验证码"
                : countdown + "(秒后重发)"}
            </Button>
          }
        />
      </>
    );
  };
  /**
   * 表单小组件
   */
  const formElement = () => {
    return (
      <View className="login-tabs-container">
        <Tabs lineWidth={14}>
          <Tab
            titleStyle={"font-size:" + Taro.pxTransform(17)}
            title="快捷登录"
          >
            <View className="login-form-wrap">{verifyLoginFormElement()}</View>
          </Tab>
          {/* <Tab
            titleStyle={"font-size:" + Taro.pxTransform(17)}
            title="账号登录"
          >
            内容 2
          </Tab> */}
        </Tabs>
      </View>
    );
  };

  const loginSubmit = () => {
    if (verifyForm.clause) {
      handleLogin();
    } else {
      confirm();
    }
  };
  const confirm = () => {
    Dialog_.alert({
      message: (
        <BaseDialogContent
          leftBtnText="不同意"
          leftBtnClick={() => Dialog_.close()}
          rightBtnText="同意"
          rightBtnClick={() => {
            Dialog_.close();
            handleLogin();
          }}
        >
          <View className="login-dialog-content-title">
            CeMeta请您确认您已阅读并同意
          </View>
          <Label className="login-dialog-content-label">
            <Navigator
              className="login-dialog-content-agreement"
              url="/pages/login/agreement/private"
            >
              《隐私条款》和
            </Navigator>
            <Navigator
              className="login-dialog-content-agreement"
              url="/pages/login/agreement/user"
            >
              《用户协议》
            </Navigator>
          </Label>
        </BaseDialogContent>
      ),
    });
  };

  const handleLogin = async () => {
    if (!verifyForm.clause) {
      setVerifyForm((prev) => ({ ...prev, clause: true }));
    }
    const companyId = company[selectCompanyIdx].id;
    const teamId = team[selectTeamIdx].id;
    const res = await login(
      {
        type: "code",
        payload: {
          phone: verifyForm.phone,
          code: verifyForm.code,
          teamId: teamId,
        },
      },
      {
        "x-company": companyId,
        "x-team": teamId,
      }
    );
    res.user.companyId = companyId;
    res.user.teamId = teamId;
    setUserStore(res);
    Taro.switchTab({
      url: "/pages/index/index",
    });
  };
  const loginSubmit1 = async () => {
    // Taro.switchTab({
    //   url: "/pages/index/index",
    // });
  }
  return (
    <View className="login-container">
      <View
        style={{
          height: Taro.pxTransform(capsuleHeight),
        }}
      ></View>
      <View className="login-title">
        你的
        <Text className="login-title-tab">AI</Text>
        营销
        <Text className="login-title-tab">助手</Text>
      </View>
      <View className="login-form-container">
        {formElement()}
        <View className="login-btn-wrap">
          <View className="login-agreement-wrap">
            <Checkbox
              className="checkout-box"
              value={verifyForm.clause}
              checkedColor="#171b27"
              iconSize="auto"
              onChange={(e) =>
                setVerifyForm((prev) => ({ ...prev, clause: e.detail }))
              }
            ></Checkbox>
            已阅读并同意
            <Navigator
              className="login-agreement-label"
              url="/pages/login/agreement/private"
            >
              《隐私条款》
            </Navigator>{" "}
            和
            <Navigator
              className="login-agreement-label"
              url="/pages/login/agreement/user"
            >
              《用户协议》
            </Navigator>
          </View>

          <BaseButton
            className="login-btn"
            disabled={loginBtnDisabled()}
            round
            onClick={() => loginSubmit()}
          >
            登录
          </BaseButton>
          <View className="not-login"  onClick={() => loginSubmit1()}>暂不登录</View>
        </View>
        <BaseBgLogo />
      </View>
      {
        // eslint-disable-next-line react/jsx-pascal-case
        <Dialog_ />
      }
    </View>
  );
}
