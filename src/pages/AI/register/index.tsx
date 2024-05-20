import { verifyPhone } from "@/common/verifyUtils";
import BaseBgLogo from "@/components/base/baseBgLogo";
import BaseButton from "@/components/base/baseButton";
import { useCapsuleHeight } from "@/hooks/pagePositionCapsuleHooks";
import { Field, Tab, Tabs } from "@antmjs/vantui";
import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { register } from "@/apis/user";

import "./index.less";

function AIRegister() {
  const [capsuleHeight] = useCapsuleHeight();

  const [verifyForm, setVerifyForm] = useState({
    name: "",
    phone: "",
    companyName: "",
  });

  const registerBtnDisabled = () =>
    !verifyPhone(verifyForm.phone) ||
    !verifyForm.name.trim() ||
    !verifyForm.companyName.trim();

  const registerSubmit = async () => {
    const res = await register(verifyForm);
    // TODO
    console.log("res", res);
  };

  const verifyRegisterFormElement = () => {
    return (
      <>
        <Field
          value={verifyForm.name}
          renderTitle={<View className="form-item-label">姓名</View>}
          titleWidth={Taro.pxTransform(70)}
          placeholder="请输入您的姓名"
          clearable
          className="form-item"
          onChange={(e) =>
            setVerifyForm((prev) => ({
              ...prev,
              name: e.detail,
            }))
          }
        />

        <Field
          value={verifyForm.phone}
          renderTitle={<View className="form-item-label">手机号</View>}
          titleWidth={Taro.pxTransform(70)}
          placeholder="请输入您的手机号"
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

        <Field
          value={verifyForm.companyName}
          renderTitle={<View className="form-item-label">企业</View>}
          titleWidth={Taro.pxTransform(70)}
          placeholder="请输入您的企业名称"
          clearable
          className="form-item"
          onChange={(e) =>
            setVerifyForm((prev) => ({
              ...prev,
              companyName: e.detail,
            }))
          }
        />
      </>
    );
  };

  return (
    <View className="ai-register_container">
      <View
        style={{
          height: Taro.pxTransform(capsuleHeight),
        }}
      ></View>
      <View className="ai-register_title">
        你的
        <Text className="register-title-tab">AI</Text>
        营销
        <Text className="register-title-tab">助手</Text>
      </View>
      <View className="ai-register_form-container">
        <View className="ai-register_tabs-container">
          <Tabs>
            <Tab
              titleStyle={"font-size:" + Taro.pxTransform(17)}
              title="快捷注册"
            >
              <View className="ai-register_form-wrap">
                {verifyRegisterFormElement()}
              </View>
            </Tab>
          </Tabs>
        </View>
        <View className="register-btn-wrap">
          <View className="register-agreement-wrap">
            <BaseButton
              className="register-btn"
              disabled={registerBtnDisabled()}
              round
              onClick={() => registerSubmit()}
            >
              立即注册
            </BaseButton>
          </View>
          <BaseBgLogo />
        </View>
      </View>
    </View>
  );
}

export default AIRegister;
