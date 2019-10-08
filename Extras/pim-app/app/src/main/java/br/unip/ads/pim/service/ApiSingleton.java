package br.unip.ads.pim.service;

import android.util.Log;

import org.json.JSONObject;

import okhttp3.ResponseBody;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiSingleton {

    private static final String TAG = ApiSingleton.class.getSimpleName();

    private static final ApiSingleton INSTANCE = new ApiSingleton();

    public static ApiSingleton get() {
        return INSTANCE;
    }

    private ApiSingleton() {
        // https://stackoverflow.com/a/6310592/3072570
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:8080")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        apiService = retrofit.create(ApiService.class);
    }

    private final ApiService apiService;

    public ApiService getApiService() {
        return apiService;
    }

    public String getMensagemErro(ResponseBody errorBody) {
        try {
            // https://stackoverflow.com/a/38243723/3072570
            JSONObject erro = new JSONObject(errorBody.string());
            return erro.getString("mensagem");
        } catch (Exception e) {
            Log.e(TAG, "Erro na conversao da mensagem.", e);
        }
        return "";
    }
}
