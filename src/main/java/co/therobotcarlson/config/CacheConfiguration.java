package co.therobotcarlson.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(co.therobotcarlson.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(co.therobotcarlson.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Grain.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Yeast.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.MashbillGrain.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.MashbillYeast.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Mashbill.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Mashbill.class.getName() + ".mashbillGrains", jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Mashbill.class.getName() + ".mashbillYeasts", jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Customer.class.getName() + ".barrels", jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Barrel.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Batch.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Batch.class.getName() + ".barrels", jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Schedule.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Schedule.class.getName() + ".batches", jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Lot.class.getName(), jcacheConfiguration);
            cm.createCache(co.therobotcarlson.domain.Lot.class.getName() + ".barrels", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
